from dataclasses import replace
import Contract as cf
import json as JSON
import asyncio
import websockets
import time

allName = {
    'storeContract': cf.storeContract,
    'clientContract': cf.clientContract,
    'asiaToken': cf.asiaToken
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
                    ad = check[0].replace("'","")
                    print(ad)
                    checkStoreOne = contract.checkStore(ad, check[1], check[2])
                    print(checkStoreOne)  
                    if(checkStoreOne==True):
                        await websocket.send(JSON.dumps(checkStoreOne))
                        check.clear()
                    elif(checkStoreOne==False):
                        await websocket.send(JSON.dumps(checkStoreOne))
                        check.clear()
        # loginafter_conn.js
        elif str["Type"] == "refresh":
            await websocket.send(JSON.dumps("check"))
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

                    # icon = contract.getStoreIconName(address)  
                    # await websocket.send(JSON.dumps(icon))

                    contract.refresh(address, key)
                elif locationTime == 0:
                    storeName = contract.getStoreName(address)
                    print(storeName)
                    await websocket.send(JSON.dumps(storeName))  
                    # icon = contract.getStoreIconName(address) 
                    # print(icon) 
                    # await websocket.send(JSON.dumps(icon))
                else:
                    storeName = contract.getStoreName(address)
                    await websocket.send(JSON.dumps(storeName))
                    # icon = contract.getStoreIconName(address)  
                    # await websocket.send(JSON.dumps(icon))

        # main_conn.js
        elif str["Type"] == "mainLoad":
            await websocket.send(JSON.dumps("check"))
            
            ap = await websocket.recv()

            address = ap
            print(ap)
            storeName = contract.getStoreName(address)
            await websocket.send(JSON.dumps(storeName))
            storeState = contract.getStoreState(address)
            await websocket.send(JSON.dumps(storeState))
            

        # main_conn.js
        elif str["Type"] == "setTime":
            await websocket.send(JSON.dumps("check"))
            
            ap = []
            ap.append(await websocket.recv())
            ap.append(await websocket.recv())
            ap.append(await websocket.recv())
            if(len(ap)==3):
                address = ap[0]
                key = ap[1]
                id = ap[2]
                print(ap)
    
                # print(key)
                # 設定進貨時間
                if contract.getDeliverTime(id, address) == 0:
                    print("DeliverTime")
                    contract.setDeliverTime(id, address, key) 
                    ap.clear()
                # 設定清洗時間
                elif contract.getDeliverTime(id, address) != 0 and contract.getFoodState(id, address) == 1 and contract.getFoodCleanTime(id, address) == 0:
                    print("FoodCleanTime")
                    contract.setFoodCleanTime(id, address, key)
                    ap.clear()
                # 刪除食物時間
                elif contract.getFoodState(id, address) == 1 and contract.getFoodCleanTime(id, address) != 0:
                    print("deleteFood")
                    contract.deleteFood(id, address, key)
                    ap.clear()
                    

        # main_conn.js
        elif str["Type"] == "setKitClenTime":
            await websocket.send(JSON.dumps("check"))
            ap = []
            ap.append(await websocket.recv())
            ap.append(await websocket.recv())
            print(ap)
            # 環境清理
            if len(ap)==2:
                address = ap[0]
                key = ap[1]
                contract.setlocationTime(address, key)
                ap.clear()

        # foodin-list_conn.js - 食材進貨時間表
        elif str["Type"] == "DeliverTime":
            check = JSON.dumps("check")
            await websocket.send(check)
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
            check = JSON.dumps("check")
            await websocket.send(check)
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

        elif str["Type"] == "StoreStateLoad":
            await websocket.send(JSON.dumps("check"))
            ap = await websocket.recv()
            print(ap)
            address = ap
            storeState = contract.getStoreState(address)
            await websocket.send(JSON.dumps(storeState))

        # business-status_conn.js
        elif str["Type"] == "StoreStateOpen":
            await websocket.send(JSON.dumps("check"))
            ap = []
            ap.append(await websocket.recv())
            ap.append(await websocket.recv())

            print(ap)
            if(len(ap)==2):
                address = ap[0]
                key = ap[1]
              
                if contract.getStoreState(address) == False:
                    # print("open")

                    state = contract.setStoreOpen(address, key)
                    if(state=="Open"):
                        await websocket.send(JSON.dumps(contract.getStoreState(address)))
                        print("state:" + JSON.dumps(contract.getStoreState(address)))
                      
                elif contract.getStoreState(address) == True:
                    # print("close")
                    state = contract.setStoreClose(address, key)
                    if(state=="Close"):
                        await websocket.send(JSON.dumps(contract.getStoreState(address)))
                        print("state:" + JSON.dumps(contract.getStoreState(address)))

        # customer-home_conn.js
        elif str["Type"] == "AllStore":
            allAddress = contract.getAllStore()
            print(allAddress)
            for i in range(len(allAddress)):
                # print(allAddress[i])
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
                print(check)
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
                        address = contract.createWallet(check[2])
                        contract.setUser(address, check[0], check[1], check[2])
                        # contract.changeame(address)
                        await websocket.send(JSON.dumps(address))
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
                    address = contract.getUserName(check[0])
                    tmp = checkUser+","+address
                    print(tmp)  
                    if(checkUser!="Fail"):
                        await websocket.send(JSON.dumps(tmp))
                        check.clear()
                    else:
                        await websocket.send(JSON.dumps(checkUser))
                        check.clear()

        elif str["Type"] == "getStoreName":
            address = await websocket.recv()
            # print(address)
            storeName = contract.getStoreName(address)
            # print(storeName)
            await websocket.send(JSON.dumps(storeName))
            
        # custormer-info.js - 顧客資訊
        elif str["Type"] == "getBalance":
            # await websocket.send("check")
            address = await websocket.recv()
            # print(address)

            balance = contract.balanceOf(address)
            await websocket.send(JSON.dumps(balance))
            # print(JSON.dumps(balance))
        # custormer-info.js - 顧客資訊
        elif str["Type"] == "transfer":
            # await websocket.send("check")
            check = []
            async for message in websocket:
                n = f"{message}" 
                print(n)  
                check.append(n)
                if len(check)==1:
                    address = check[0]
                    # coin = check[1]
                    contract.transfer(address)
                    await websocket.send(JSON.dumps("Transfer success"))
                    check.clear()

        elif str["Type"] == "transferFrom":
            check = []
            async for message in websocket:
                n = f"{message}" 
                print(n)  
                check.append(n)
                print(check)
                if len(check)==4:
                    state = contract.approve(check[0], int(check[2]), check[3])
                    if(state=="Success"):
                        result = contract.transferFrom(check[0], check[1], int(check[2]), check[3])
                        await websocket.send(JSON.dumps(result))
                        check.clear()
        

            
               
    finally:
        connected.remove(websocket)

async def main():
    async with websockets.serve(echo, "120.108.111.231", 6012):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())