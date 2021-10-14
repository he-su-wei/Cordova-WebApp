import Contract as cf
import json as JSON
import asyncio
import websockets
import time

allName = {
    'storeContract': cf.storeContract,
    'clientContract': cf.clientContract
}
async def echo(websocket, path):
    connected = set()
    connected.add(websocket)
    try:
        str = await websocket.recv()
        str = JSON.loads(str)

        contractName = str["Main"]
        func = allName[contractName]
        contract = func()
        
        
         # store-login_conn.js
        if str["Type"] == "storeLogin":
            await websocket.send("check")
            address = await websocket.recv()
            storeName = contract.getStoreName(address)
            await websocket.send(JSON.dumps(storeName))
            print(storeName)
            check = []
            async for message in websocket:
                n = f"{message}"    
                check.append(n)
                print(check)
                if len(check)==3:
                    checkStoreOne = contract.checkStore(check[0], check[1], check[2])
                    print(checkStoreOne)  
                    if(checkStoreOne==True):
                        await websocket.send(JSON.dumps(checkStoreOne))
                        check.clear()
                    elif(checkStoreOne==False):
                        await websocket.send(JSON.dumps(checkStoreOne))
                        check.clear()
        # firstone-login.js - 店家登入
        elif str["Type"] == "firstLogin":
            check = []
            async for message in websocket:
                n = f"{message}"    
                check.append(n)
                # print(check)
                if len(check)==3:
                    print(check)
                    checkStoreOne = contract.checkStore(check[0], check[1], check[2])
                    print(checkStoreOne)  
                    if(checkStoreOne==True):
                        await websocket.send(JSON.dumps(checkStoreOne))
                        check.clear()
                    elif(checkStoreOne==False):
                        await websocket.send(JSON.dumps(checkStoreOne))
                        check.clear()
        # loginafter_conn.js
        elif str["Type"] == "refresh":
            await websocket.send("check")
            ap = []
            ap.append(await websocket.recv())
            ap.append(await websocket.recv())

            if(len(ap)==2):
                address = ap[0]
                key = ap[1]
                # 重製清理時間
                locationTime = contract.getlocationTime(address)

                # 現在unixTime
                nowTime = int(time.time())
                if locationTime != 0 and nowTime >= locationTime+6480:
                    storeName = contract.getStoreName(address)
                    await websocket.send(JSON.dumps(storeName))

                    icon = contract.getStoreIconName(address)  
                    await websocket.send(JSON.dumps(icon))

                    contract.refresh(address, key)
                elif locationTime == 0:
                    storeName = contract.getStoreName(address)
                    print(storeName)
                    await websocket.send(JSON.dumps(storeName))  
                    icon = contract.getStoreIconName(address) 
                    print(icon) 
                    await websocket.send(JSON.dumps(icon))
                else:
                    storeName = contract.getStoreName(address)
                    await websocket.send(JSON.dumps(storeName))
                    icon = contract.getStoreIconName(address)  
                    await websocket.send(JSON.dumps(icon))
        # main_conn.js
        elif str["Type"] == "setTime":
            await websocket.send("check")
            
            ap = []
            ap.append(await websocket.recv())
            ap.append(await websocket.recv())
            if(len(ap)==2):
                address = ap[0]
                key = ap[1]
                print(ap)
                storeName = contract.getStoreName(address)
                await websocket.send(JSON.dumps(storeName))
            
                lis = []
                async for message in websocket:
                    n = f"{message}"
                    lis.append(n)
                    
                    if len(lis)==2:
                        id = lis[0]
                        address = lis[1]
                        print(key)
                        # 設定進貨時間
                        if contract.getDeliverTime(id, address) == 0:
                            print("DeliverTime")
                            contract.setDeliverTime(id, address, key) 
                            lis.clear()
                        # 設定清洗時間
                        elif contract.getDeliverTime(id, address) != 0 and contract.getFoodState(id, address) == 1 and contract.getFoodCleanTime(id, address) == 0:
                            print("FoodCleanTime")
                            contract.setFoodCleanTime(id, address, key)
                            lis.clear()
                        # 刪除食物時間
                        elif contract.getFoodState(id, address) == 1 and contract.getFoodCleanTime(id, address) != 0:
                            print("deleteFood")
                            contract.deleteFood(id, address, key)
                            lis.clear()
                    # 環境清理
                    elif len(lis) == 1 and len(lis[0]) == 42:
                        address = lis[0]
                        contract.setlocationTime(address, key)
                        lis.clear()
        # foodin-list_conn.js - 食材進貨時間表
        elif str["Type"] == "DeliverTime":
            await websocket.send("check")
            address = await websocket.recv()
            # print(address)
            dliverTime = contract.getAllDeliverTime(address)
            await websocket.send(JSON.dumps(dliverTime))
            print(JSON.dumps(dliverTime))

            ids = contract.getAllFoodID(address)
            await websocket.send(JSON.dumps(ids))
            print(JSON.dumps(ids))
        # food-list_conn.js - 食材清洗時間表
        elif str["Type"] == "CleanTime":
            await websocket.send("check")
            address = await websocket.recv()

            CleanTime = contract.getAllCleanTime(address)
            await websocket.send(JSON.dumps(CleanTime))
            print(JSON.dumps(CleanTime))

            ids = contract.getAllFoodID(address)
            await websocket.send(JSON.dumps(ids))
            print(JSON.dumps(ids))
        
        # kitchen-list_conn.js - 環境清理時間表
        elif str["Type"] == "LocationTime":
            await websocket.send("check")
            address = await websocket.recv()

            locationTime = contract.getlocationTime(address)
            await websocket.send(JSON.dumps(locationTime))
            print(JSON.dumps(locationTime))

            locationStatus = contract.getlocationStatus(address)
            await websocket.send(JSON.dumps(locationStatus))
            print(JSON.dumps(locationStatus))

        # business-status_conn.js
        elif str["Type"] == "StoreState":
            await websocket.send("check")
            ap = []
            ap.append(await websocket.recv())
            ap.append(await websocket.recv())

            if(len(ap)==2):
                address = ap[0]
                key = ap[1]
                async for message in websocket:
                    n = f"{message}"
                    address = n 
                    print(n)
                    if contract.getStoreState(address) == False:
                        contract.setStoreOpen(address, key)
                        await websocket.send(JSON.dumps(contract.getStoreState(address)))
                        print(JSON.dumps(contract.getStoreState(address)))
                    elif contract.getStoreState(address) == True:
                        contract.setStoreClose(address, key)
                        await websocket.send(JSON.dumps(contract.getStoreState(address)))
                        print(JSON.dumps(contract.getStoreState(address)))

        # customer-home_conn.js
        elif str["Type"] == "AllStore":
            allAddress = contract.getAllStore()
            for i in range(len(allAddress)):
                sum = contract.storeInfoForUser(allAddress[i])
                await websocket.send(JSON.dumps(sum))

        # customer-storeInfo_conn.js
        elif str["Type"] == "storeInfoForUser":
            await websocket.send("check")
            address = await websocket.recv()

            sum = contract.storeInfoForUser(address)
            await websocket.send(JSON.dumps(sum))
         # customer-foodin-list_conn.js
        elif str["Type"] == "customerFoodinlist":
            await websocket.send("check")
            address = await websocket.recv()
            print(address)
            dliverTime = contract.getAllDeliverTime(address)
            await websocket.send(JSON.dumps(dliverTime))
            print(JSON.dumps(dliverTime))

            ids = contract.getAllFoodID(address)
            await websocket.send(JSON.dumps(ids))
            print(JSON.dumps(ids))

        # customer-food-list_conn.js
        elif str["Type"] == "customerFoodlist":
            await websocket.send("check")
            address = await websocket.recv()
            print(address)

            CleanTime = contract.getAllCleanTime(address)
            await websocket.send(JSON.dumps(CleanTime))
            print(JSON.dumps(CleanTime))

            ids = contract.getAllFoodID(address)
            await websocket.send(JSON.dumps(ids))
            print(JSON.dumps(ids))
        
        # customer-kitchen-list_conn.js
        elif str["Type"] == "customerKitchenList":
            await websocket.send("check")
            address = await websocket.recv()

            locationTime = contract.getlocationTime(address)
            await websocket.send(JSON.dumps(locationTime))
            print(JSON.dumps(locationTime))

            locationStatus = contract.getlocationStatus(address)
            await websocket.send(JSON.dumps(locationStatus))
            print(JSON.dumps(JSON.dumps(locationStatus)))

        # signup_conn.js
        elif str["Type"] == "signup":
            check = []
            async for message in websocket:
                n = f"{message}"    
                check.append(n)
                # print(check)
                if len(check)==3:
                    # 取得所有使用者帳號
                    # ex: ['a', 'b']
                    lst = contract.getAllAccount()
                    # 將新使用者註冊的帳號(假設a)加入 ex: ['a', 'b', 'a']
                    lst.append(check[1])

                    set_lst = set(lst)
                    # set_lst = ['a', 'b']

                    # 判斷是否有重複
                    if(len(set_lst)!=len(lst)):
                        await websocket.send(JSON.dumps("帳號重複"))
                        lst.clear()
                    elif(len(set_lst)==len(lst)):
                        contract.setUser(check[0], check[1], check[2])
                        await websocket.send(JSON.dumps("註冊成功"))
                        lst.clear()

        # customer-login_conn.js
        elif str["Type"] == "customerLogin":
            check = []
            async for message in websocket:
                n = f"{message}" 
                print(n)  
                check.append(n)
                print(check)
                if len(check)==2:
                    checkUser = contract.checkUser(check[0], check[1])
                    print(checkUser)  
                    if(checkUser==True):
                        await websocket.send(JSON.dumps(checkUser))
                        check.clear()
                    elif(checkUser==False):
                        await websocket.send(JSON.dumps(checkUser))
                        check.clear()
    finally:
        connected.remove(websocket)

async def main():
    async with websockets.serve(echo, "192.168.68.52", 6001):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())