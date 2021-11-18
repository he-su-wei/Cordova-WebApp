from web3 import  HTTPProvider,Web3
import json as JSON
from datetime import datetime
import os
import numpy as np

class storeContract:
    def __init__(self):
        print("storeContract Success")
        self.w3 = Web3(HTTPProvider('http://127.0.0.1:8080'))
        self.count = 0
        with open("storeALL.abi") as f:
            self.temp_abi = JSON.load(f)

        # 設定合約位址
        self.contract_addr = self.w3.toChecksumAddress('0x213efdA6a908367A8a9EA312c88435089a76629E')
        self.contract = self.w3.eth.contract(address=self.contract_addr, abi=self.temp_abi)
        # 設定帳號位址
        self.account = self.w3.toChecksumAddress('0x841505D2dCf63793434DE0780347D5F00168Eddf')

    # 設定食材進貨時間
    def setDeliverTime(self, id, address, password):
        address = self.w3.toChecksumAddress(address)
        estimate_gas = self.contract.functions.setDeliverTime(id, address).estimateGas()
        nonce = self.w3.eth.getTransactionCount(self.account)
        txn = self.contract.functions.setDeliverTime(id, address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })

        #設定私鑰
        path = "D:/BlockChain/node1/keystore"
        x = os.path.join(path, address)
        storeKey = password
        with open(x) as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key, storeKey)
            print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        # print('0x'+bytes.hex(tx_hash))
        return "Success"

    # 設定食物清理時間
    def setFoodCleanTime(self, id, address, password):
        address = self.w3.toChecksumAddress(address)
        estimate_gas = self.contract.functions.setFoodCleanTime(id, address).estimateGas()
        nonce = self.w3.eth.getTransactionCount(self.account)
        txn = self.contract.functions.setFoodCleanTime(id, address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        path = "D:/BlockChain/node1/keystore"
        x = os.path.join(path, address)
        storeKey = password
        with open(x) as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key, storeKey)
            print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        # print('0x'+bytes.hex(tx_hash))
        return "Success"

    # 刪除食物進貨時間跟清理時間
    def deleteFood(self, id, address, password):
        address = self.w3.toChecksumAddress(address)
        estimate_gas = self.contract.functions.deleteFood(id, address).estimateGas()
        nonce = self.w3.eth.getTransactionCount(self.account)
        txn = self.contract.functions.deleteFood(id, address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        path = "D:/BlockChain/node1/keystore"
        x = os.path.join(path, address)
        storeKey = password
        with open(x) as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key, storeKey)
            print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        # print('0x'+bytes.hex(tx_hash))
        return "Success"

    # 設定環境清理時間
    def setlocationTime(self, address, password):
        address = self.w3.toChecksumAddress(address)
        estimate_gas = self.contract.functions.setlocationTime(address).estimateGas()
        nonce = self.w3.eth.getTransactionCount(self.account)
        txn = self.contract.functions.setlocationTime(address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        path = "D:/BlockChain/node1/keystore"
        x = os.path.join(path, address)
        storeKey = password
        with open(x) as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key,  storeKey)
            print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        # print('0x'+bytes.hex(tx_hash))
        return "Success"

    # 重製環境清理
    def refresh(self, address, password):
        address = self.w3.toChecksumAddress(address)
        estimate_gas = self.contract.functions.refresh(address).estimateGas()
        nonce = self.w3.eth.getTransactionCount(self.account)
        txn = self.contract.functions.refresh(address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        path = "D:/BlockChain/node1/keystore"
        x = os.path.join(path, address)
        storeKey = password
        with open(x) as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key,  storeKey)
            print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        # print('0x'+bytes.hex(tx_hash))
        return "Success"

    # 開始營業
    def setStoreOpen(self, address, password):
        address = self.w3.toChecksumAddress(address)
        estimate_gas = self.contract.functions.setStoreOpen(address).estimateGas()
        nonce = self.w3.eth.getTransactionCount(self.account)
        txn = self.contract.functions.setStoreOpen(address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        path = "D:/BlockChain/node1/keystore"
        x = os.path.join(path, address)
        storeKey = password
        with open(x) as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key,  storeKey)
            print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        # print('0x'+bytes.hex(tx_hash))
        return "Success"

    # 關閉營業
    def setStoreClose(self, address, password):
        address = self.w3.toChecksumAddress(address)
        estimate_gas = self.contract.functions.setStoreClose(address).estimateGas()
        nonce = self.w3.eth.getTransactionCount(self.account)
        txn = self.contract.functions.setStoreClose(address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        path = "D:/BlockChain/node1/keystore"
        x = os.path.join(path, address)
        storeKey = password
        with open(x) as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key, storeKey)
            print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        # print('0x'+bytes.hex(tx_hash))
        return "Success"

    # 取得進貨時間
    def getDeliverTime(self, id, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.getDeliverTime(id, address).call()

    # 取得食材狀態
    def getFoodState(self, id, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.getFoodState(id, address).call()
        
    # 取得食物清洗時間
    def getFoodCleanTime(self, id, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.getFoodCleanTime(id, address).call()

    # 取得商店名字
    def getStoreName(self, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.getStoreName(address).call()

    # 取得所有食物id
    def getAllFoodID(self, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.getAllFoodID(address).call()

    # 取得所有進貨時間
    def getAllDeliverTime(self, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.getAllDeliverTime(address).call()

    # 取得所有食材清洗時間
    def getAllCleanTime(self, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.getAllCleanTime(address).call()

    # 檢查商店登入資料是否正確
    def checkStore(self, address, account, pwd):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.checkStore(address, account, pwd).call()

    # 取得環境清理時間
    def getlocationTime(self, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.getlocationTime(address).call()

    # 取的環境清理狀態
    def getlocationStatus(self, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.getlocationStatus(address).call()

    # 取得商店狀態
    def getStoreState(self, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.getStoreState(address).call()

    # 取得所有商店address
    def getAllStore(self):
        return self.contract.functions.getAllStore().call()

    # 取得storeInfo
    def storeInfoForUser(self, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.storeInfoForUser(address).call()

    # 取得商店圖片檔名
    def getStoreIconName(self, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.getStoreIconName(address).call()
    

class clientContract:
    print("clientContract Success")
    def __init__(self):
        self.w3 = Web3(HTTPProvider('http://127.0.0.1:8080'))
        self.count = 0
        with open("clientALL.abi") as f:
            self.temp_abi = JSON.load(f)

        # 設定合約位址
        self.contract_addr = self.w3.toChecksumAddress('0x0909A471E67d05D952fb07b264A23c321c432D2e')
        self.contract = self.w3.eth.contract(address=self.contract_addr, abi=self.temp_abi)
        # 設定帳號位址
        self.account = self.w3.toChecksumAddress('0x841505D2dCf63793434DE0780347D5F00168Eddf')

    # 使用者註冊
    def setUser(self, name, account, pw):
        newAccount = self.w3.geth.personal.new_account(account)
        # newAddress = self.w3.geth.personal.list_accounts()
        print('address is : {}'.format(newAccount))
        
        # address = self.w3.toChecksumAddress(address)
        estimate_gas = self.contract.functions.setUser(name, account, pw).estimateGas()
        nonce = self.w3.eth.getTransactionCount(self.account)
        txn = self.contract.functions.setUser(name, account, pw).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        with open(r'D:\BlockChain\node1\keystore\841505d2dcf63793434de0780347d5f00168eddf') as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key, '1234wxyz')
            print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        # print('0x'+bytes.hex(tx_hash))
        # return "Success"
        return newAccount

    # 取得所有使用者帳號
    def getAllAccount(self):
      return self.contract.functions.getAllAccount().call()

    def checkUser(self, account, password):
        return self.contract.functions.checkUser(account, password).call()

    def setComment(self, address, name, comment):
        return self.contract.functions.setComment(address, name, comment).call()
    
    def getComment(self, address):
        return self.contract.functions.getComment(address).call()

class asiaToken:
    print("AsiaTokenContract Success")
    def __init__(self):
        self.w3 = Web3(HTTPProvider('http://127.0.0.1:8080'))
        self.count = 0
        with open("asiaToken.abi") as f:
            self.temp_abi = JSON.load(f)

        # 設定合約位址
        self.contract_addr = self.w3.toChecksumAddress('0x9417E30527442614E74C1b40531B5484EBbDb575')
        self.contract = self.w3.eth.contract(address=self.contract_addr, abi=self.temp_abi)
        # 設定帳號位址
        self.account = self.w3.toChecksumAddress('0xB5B5A2F58A46d1c3813f853d844e2E8e0C2D3baF')
    #取得餘額
    def balanceOf(self, address):
        return self.contract.functions.balanceOf(address).call()

    #approve
    def approve(self, address):
        # print(self.contract.functions.totalSupply().call())
        # mainAddress = self.w3.toChecksumAddress(mainAddress)
        address = self.w3.toChecksumAddress(address)
        # print(type(address))
        estimate_gas = self.contract.functions.approve(address, 10).estimateGas()
        # print(estimate_gas)
        nonce = self.w3.eth.getTransactionCount(self.account)
        # print(nonce)
        txn = self.contract.functions.approve(address, 10).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'wei'),
            'nonce': nonce
            })
        # print(txn)
        #設定私鑰
        with open(r'D:\BlockChain\node1\keystore\0xb5b5a2f58a46d1c3813f853d844e2e8e0c2d3baf') as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key, 'passwordTwo')
            # print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        print('0x'+bytes.hex(tx_hash))
        return "Success"

    #發送測試幣
    def transfer(self, address):
        # print(self.contract.functions.totalSupply().call())
        address = self.w3.toChecksumAddress(address)
        # estimate_gas = self.contract.functions.transfer(address, 10).estimateGas({'from': address})
        nonce = self.w3.eth.getTransactionCount(self.account)
        print(nonce)
        txn = self.contract.functions.transfer(address, 10).buildTransaction({
            'chainId': 428,
            'gas': 5000000,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        # print(txn)
        #設定私鑰
        with open(r'D:\BlockChain\node1\keystore\0xb5b5a2f58a46d1c3813f853d844e2e8e0c2d3baf') as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key, 'passwordTwo')
            # print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        print('0x'+bytes.hex(tx_hash))
        return "Success"