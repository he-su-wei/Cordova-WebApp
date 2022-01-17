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
        self.contract_addr = self.w3.toChecksumAddress('0x9ca9F12828E114A913d27c06e7dDF2f81eF385b5')
        self.contract = self.w3.eth.contract(address=self.contract_addr, abi=self.temp_abi)
        # 設定帳號位址
        self.account = self.w3.toChecksumAddress("0xb93E7ba12f4D6D9AAF0974a676f992ac5EE15969")

    # 設定食材進貨時間
    def setDeliverTime(self, id, address, password):
        address = self.w3.toChecksumAddress(address)
        estimate_gas = self.contract.functions.setDeliverTime(id, address).estimateGas()
        nonce = self.w3.eth.getTransactionCount(address)
        txn = self.contract.functions.setDeliverTime(id, address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })

        #設定私鑰
        path = "D:/BlockChain/node1/keystore/"
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
        nonce = self.w3.eth.getTransactionCount(address)
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
        nonce = self.w3.eth.getTransactionCount(address)
        txn = self.contract.functions.deleteFood(id, address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        path = "D:/BlockChain/node1/keystore/"
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
        nonce = self.w3.eth.getTransactionCount(address)
        txn = self.contract.functions.setlocationTime(address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        path = "D:/BlockChain/node1/keystore/"
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
        nonce = self.w3.eth.getTransactionCount(address)
        txn = self.contract.functions.refresh(address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        path = "D:/BlockChain/node1/keystore/"
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
        nonce = self.w3.eth.getTransactionCount(address)
        txn = self.contract.functions.setStoreOpen(address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        path = "D:/BlockChain/node1/keystore/"
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
        print(self.w3.eth.wait_for_transaction_receipt(tx_hash))
        return "Open"

    # 關閉營業
    def setStoreClose(self, address, password):
        address = self.w3.toChecksumAddress(address)
        estimate_gas = self.contract.functions.setStoreClose(address).estimateGas()
        nonce = self.w3.eth.getTransactionCount(address)
        txn = self.contract.functions.setStoreClose(address).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        path = "D:/BlockChain/node1/keystore/"
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
        print(self.w3.eth.wait_for_transaction_receipt(tx_hash))
        return "Close"

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
        self.contract_addr = self.w3.toChecksumAddress('0x9488f5d136B61bF38A471ab3cE9CB25895c1FbF2')
        self.contract = self.w3.eth.contract(address=self.contract_addr, abi=self.temp_abi)
        # 設定帳號位址
        self.account = self.w3.toChecksumAddress('0xb93E7ba12f4D6D9AAF0974a676f992ac5EE15969')

    def createWallet(self, account):
        newAccount = self.w3.geth.personal.new_account(account)
        # newAddress = self.w3.geth.personal.list_accounts()
        print('address is : {}'.format(newAccount))
        # print(type(newAccount))
        # name="UTC--..."+newAccount
        # dic = "D:\\BlockChain\\node1\\keystore\\"
        # old_file = os.path.join(dic,name)
        # os.rename(old_file, newAccount)
        return newAccount

    # 使用者註冊
    def setUser(self, address, name, account, pw):
        address = self.w3.toChecksumAddress(address)
        estimate_gas = self.contract.functions.setUser(address, name, account, pw).estimateGas()
        nonce = self.w3.eth.getTransactionCount(self.account)
        txn = self.contract.functions.setUser(address, name, account, pw).buildTransaction({
            'chainId': 428,
            'gas': estimate_gas,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        
        #設定私鑰
        with open(r'D:\BlockChain\node1\keystore\0xb93e7ba12f4d6d9aaf0974a676f992ac5ee15969') as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key, '1234wxyz')
            print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        # print('0x'+bytes.hex(tx_hash))
        return "Success"

    # 取得所有使用者帳號
    def getAllAccount(self):
      return self.contract.functions.getAllAccount().call()

    def checkUser(self, account, password):
        return self.contract.functions.checkUser(account, password).call()

    def getUserName(self, account):
        return self.contract.functions.getUserName(account).call()

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
        self.contract_addr = self.w3.toChecksumAddress('0xaBDF2ddc96435aF2Fd336575B97Cda569ba0F95e')
        self.contract = self.w3.eth.contract(address=self.contract_addr, abi=self.temp_abi)
        # 設定帳號位址
        self.account = self.w3.toChecksumAddress('0xb93E7ba12f4D6D9AAF0974a676f992ac5EE15969')
    #取得餘額
    def balanceOf(self, address):
        address = self.w3.toChecksumAddress(address)
        return self.contract.functions.balanceOf(address).call()

    #approve
    def approve(self, add_from, coin, pwd):

        address = self.w3.toChecksumAddress(add_from)
        # print(type(address))
        estimate_gas = self.contract.functions.approve(address, coin).estimateGas()
        # print(estimate_gas)
        nonce = self.w3.eth.getTransactionCount(address)
        # print(nonce)
        txn = self.contract.functions.approve(address, coin).buildTransaction({
            'chainId': 428,
            'gas': 5000000,
            'gasPrice': self.w3.toWei('1', 'wei'),
            'nonce': nonce
            })
        # print(txn)

        #設定私鑰
        path = "D:/BlockChain/node1/keystore"
        x = os.path.join(path, address)
        privateKey = pwd
        with open(x) as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key, privateKey)
            print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)

            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        print(self.w3.eth.wait_for_transaction_receipt(tx_hash))
        print()
        print('0x'+bytes.hex(tx_hash))
        print()
        # return '0x'+bytes.hex(tx_hash)
        return "Success"

    #發送測試幣
    def transfer(self, address):
        # print(self.contract.functions.totalSupply().call())
        address = self.w3.toChecksumAddress(address)
        # estimate_gas = self.contract.functions.transfer(address, 10).estimateGas({'from': address})
        nonce = self.w3.eth.getTransactionCount(self.account)
        txn = self.contract.functions.transfer(address, 10).buildTransaction({
            'chainId': 428,
            'gas': 5000000,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        # print(txn)
        #設定私鑰
        with open(r'D:\BlockChain\node1\keystore\0xb93e7ba12f4d6d9aaf0974a676f992ac5ee15969') as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key, '1234wxyz')
            # print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        print('0x'+bytes.hex(tx_hash))
        return "Success"

    def transferFrom(self, add_from, add_to, coin, pwd):
    
        ad_from = self.w3.toChecksumAddress(add_from)
        ad_to = self.w3.toChecksumAddress(add_to)
        self.w3.eth.default_account = ad_from
        # print(self.w3.eth.default_account)

        nonce = self.w3.eth.getTransactionCount(ad_from)
        txn = self.contract.functions.transferFrom(ad_from, ad_to, coin).buildTransaction({
            'chainId': 428,
            'gas': 5000000,
            'gasPrice': self.w3.toWei('1', 'gwei'),
            'nonce': nonce
            })
        # print(txn)
        #設定私鑰
        path = "D:/BlockChain/node1/keystore"
        x = os.path.join(path, ad_from)
        privateKey = pwd
        with open(x) as keyfile:
            encrypted_key = keyfile.read()
            private_key = self.w3.eth.account.decrypt(encrypted_key, privateKey)
            print(bytes.hex(private_key))
            key = bytes.hex(private_key)
            signed_txn = self.w3.eth.account.signTransaction(txn, key)
            
        tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
        print(self.w3.eth.wait_for_transaction_receipt(tx_hash))
        print()
        print('0x'+bytes.hex(tx_hash))
        return "Success"