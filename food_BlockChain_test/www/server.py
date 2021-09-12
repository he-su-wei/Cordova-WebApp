# -*- coding: utf-8 -*-
"""
Created on Wed Aug 11 17:07:38 2021

@author: Tyler
"""

import os
from web3 import  HTTPProvider,Web3
#from web3.auto import w3
import json
from datetime import datetime


class TestNetWorkContract:
     
   def __init__(self):
      self.w3 = Web3(HTTPProvider('http://127.0.0.1:7545'))
      #self.w3 = Web3.HTTPProvider('')
      #print(w3.clientVersion)
      self.count=0
      # Assume the contract we're going to invoke is a standard ERC20 contract.
      # 將remix上的ABI複製貼上到TestContract.abi檔案
      with open("TestContract.abi") as f:
         self.temp_abi = json.load(f)
      
      # 設定合約位址
      self.contract_addr = self.w3.toChecksumAddress('0x82584E3DEf6f4a0a9464062e65898D4b5dB07eeE')
      self.contract = self.w3.eth.contract(address=self.contract_addr, abi=self.temp_abi)
      # 設定帳號位址
      self.account = self.w3.toChecksumAddress('0x9ac947be54588E3857fe580630a83e4B60a2294F')
   
   # def Store(self,x):
   #    if(isinstance(x, int)==False):
   #       print(isinstance(x, int))
   #       return
   #    else:
   #       estimate_gas = self.contract.functions.store(x).estimateGas()
   #       nonce = self.w3.eth.getTransactionCount(self.account)
   #       txn = self.contract.functions.store(x).buildTransaction({
   #          'chainId': 3,
   #          'gas': estimate_gas,
   #          'gasPrice': self.w3.toWei('1000', 'gwei'),
   #          'nonce': nonce
   #          })
      
   #       # Sign the transaction.
         
   #       signed_txn = self.w3.eth.account.signTransaction(txn, private_key='c6d4f596c9c743cb06c6ff1def451a9a12c3f60e1cbb63533cde9569fab05406')
         
   #       # with open(r'D:\BlockChain\node1\keystore\UTC--2021-01-28T08-33-08.903281600Z--62abb714ae2eedd6d3329a658bb49f78b5eb98bb') as keyfile:
   #       #    encrypted_key = keyfile.read()
   #       #    private_key = w3.eth.account.decrypt(encrypted_key, 'password')
   #       tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
   #       print('0x'+bytes.hex(tx_hash))
   #       return "Success"
      
   # 設定食材進貨時間
   def setDeliverTime(self, id, address):
      address = self.w3.toChecksumAddress(address)
      estimate_gas = self.contract.functions.setDeliverTime(id, address).estimateGas()
      nonce = self.w3.eth.getTransactionCount(self.account)
      txn = self.contract.functions.setDeliverTime(id, address).buildTransaction({
         'chainId': 3,
         'gas': estimate_gas,
         'gasPrice': self.w3.toWei('1', 'gwei'),
         'nonce': nonce
         })
      # Sign the transaction.
      #設定私鑰
      signed_txn = self.w3.eth.account.signTransaction(txn, private_key='fb8ad9e391a3665f9b56cdb1d1623517f7f3239d3987ce0ce51150b8fcbdcb08')
      
      # with open(r'D:\BlockChain\node1\keystore\UTC--2021-01-28T08-33-08.903281600Z--62abb714ae2eedd6d3329a658bb49f78b5eb98bb') as keyfile:
      #    encrypted_key = keyfile.read()
      #    private_key = w3.eth.account.decrypt(encrypted_key, 'password')
      tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
      # print('0x'+bytes.hex(tx_hash))
      return "Success"

   # 設定食物清理時間
   def setFoodCleanTime(self, id, address):
      address = self.w3.toChecksumAddress(address)
      estimate_gas = self.contract.functions.setFoodCleanTime(id, address).estimateGas()
      nonce = self.w3.eth.getTransactionCount(self.account)
      txn = self.contract.functions.setFoodCleanTime(id, address).buildTransaction({
         'chainId': 3,
         'gas': estimate_gas,
         'gasPrice': self.w3.toWei('1', 'gwei'),
         'nonce': nonce
         })
      # Sign the transaction.
      #設定私鑰
      signed_txn = self.w3.eth.account.signTransaction(txn, private_key='fb8ad9e391a3665f9b56cdb1d1623517f7f3239d3987ce0ce51150b8fcbdcb08')
      
      # with open(r'D:\BlockChain\node1\keystore\UTC--2021-01-28T08-33-08.903281600Z--62abb714ae2eedd6d3329a658bb49f78b5eb98bb') as keyfile:
      #    encrypted_key = keyfile.read()
      #    private_key = w3.eth.account.decrypt(encrypted_key, 'password')
      tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
      # print('0x'+bytes.hex(tx_hash))
      return "Success"

   # 刪除食物進貨時間跟清理時間
   def deleteFood(self, id, address):
      address = self.w3.toChecksumAddress(address)
      estimate_gas = self.contract.functions.deleteFood(id, address).estimateGas()
      nonce = self.w3.eth.getTransactionCount(self.account)
      txn = self.contract.functions.deleteFood(id, address).buildTransaction({
         'chainId': 3,
         'gas': estimate_gas,
         'gasPrice': self.w3.toWei('1', 'gwei'),
         'nonce': nonce
         })
      # Sign the transaction.
      #設定私鑰
      signed_txn = self.w3.eth.account.signTransaction(txn, private_key='fb8ad9e391a3665f9b56cdb1d1623517f7f3239d3987ce0ce51150b8fcbdcb08')
      
      # with open(r'D:\BlockChain\node1\keystore\UTC--2021-01-28T08-33-08.903281600Z--62abb714ae2eedd6d3329a658bb49f78b5eb98bb') as keyfile:
      #    encrypted_key = keyfile.read()
      #    private_key = w3.eth.account.decrypt(encrypted_key, 'password')
      tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
      # print('0x'+bytes.hex(tx_hash))
      return "Success"

   # 設定環境清理時間
   def setlocationTime(self, address):
      address = self.w3.toChecksumAddress(address)
      estimate_gas = self.contract.functions.setlocationTime(address).estimateGas()
      nonce = self.w3.eth.getTransactionCount(self.account)
      txn = self.contract.functions.setlocationTime(address).buildTransaction({
         'chainId': 3,
         'gas': estimate_gas,
         'gasPrice': self.w3.toWei('1', 'gwei'),
         'nonce': nonce
         })
      # Sign the transaction.
      #設定私鑰
      signed_txn = self.w3.eth.account.signTransaction(txn, private_key='fb8ad9e391a3665f9b56cdb1d1623517f7f3239d3987ce0ce51150b8fcbdcb08')
      
      # with open(r'D:\BlockChain\node1\keystore\UTC--2021-01-28T08-33-08.903281600Z--62abb714ae2eedd6d3329a658bb49f78b5eb98bb') as keyfile:
      #    encrypted_key = keyfile.read()
      #    private_key = w3.eth.account.decrypt(encrypted_key, 'password')
      tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
      # print('0x'+bytes.hex(tx_hash))
      return "Success"

   # 重製環境清理
   def refresh(self, address):
      address = self.w3.toChecksumAddress(address)
      estimate_gas = self.contract.functions.refresh(address).estimateGas()
      nonce = self.w3.eth.getTransactionCount(self.account)
      txn = self.contract.functions.refresh(address).buildTransaction({
         'chainId': 3,
         'gas': estimate_gas,
         'gasPrice': self.w3.toWei('1', 'gwei'),
         'nonce': nonce
         })
      # Sign the transaction.
      #設定私鑰
      signed_txn = self.w3.eth.account.signTransaction(txn, private_key='fb8ad9e391a3665f9b56cdb1d1623517f7f3239d3987ce0ce51150b8fcbdcb08')
      
      # with open(r'D:\BlockChain\node1\keystore\UTC--2021-01-28T08-33-08.903281600Z--62abb714ae2eedd6d3329a658bb49f78b5eb98bb') as keyfile:
      #    encrypted_key = keyfile.read()
      #    private_key = w3.eth.account.decrypt(encrypted_key, 'password')
      tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
      # print('0x'+bytes.hex(tx_hash))
      return "Success"

   # 開始營業
   def setStoreOpen(self, address):
      address = self.w3.toChecksumAddress(address)
      estimate_gas = self.contract.functions.setStoreOpen(address).estimateGas()
      nonce = self.w3.eth.getTransactionCount(self.account)
      txn = self.contract.functions.setStoreOpen(address).buildTransaction({
         'chainId': 3,
         'gas': estimate_gas,
         'gasPrice': self.w3.toWei('1', 'gwei'),
         'nonce': nonce
         })
      # Sign the transaction.
      #設定私鑰
      signed_txn = self.w3.eth.account.signTransaction(txn, private_key='fb8ad9e391a3665f9b56cdb1d1623517f7f3239d3987ce0ce51150b8fcbdcb08')
      
      # with open(r'D:\BlockChain\node1\keystore\UTC--2021-01-28T08-33-08.903281600Z--62abb714ae2eedd6d3329a658bb49f78b5eb98bb') as keyfile:
      #    encrypted_key = keyfile.read()
      #    private_key = w3.eth.account.decrypt(encrypted_key, 'password')
      tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
      # print('0x'+bytes.hex(tx_hash))
      return "Success"

   # 關閉營業
   def setStoreClose(self, address):
      address = self.w3.toChecksumAddress(address)
      estimate_gas = self.contract.functions.setStoreClose(address).estimateGas()
      nonce = self.w3.eth.getTransactionCount(self.account)
      txn = self.contract.functions.setStoreClose(address).buildTransaction({
         'chainId': 3,
         'gas': estimate_gas,
         'gasPrice': self.w3.toWei('1', 'gwei'),
         'nonce': nonce
         })
      # Sign the transaction.
      #設定私鑰
      signed_txn = self.w3.eth.account.signTransaction(txn, private_key='fb8ad9e391a3665f9b56cdb1d1623517f7f3239d3987ce0ce51150b8fcbdcb08')
      
      # with open(r'D:\BlockChain\node1\keystore\UTC--2021-01-28T08-33-08.903281600Z--62abb714ae2eedd6d3329a658bb49f78b5eb98bb') as keyfile:
      #    encrypted_key = keyfile.read()
      #    private_key = w3.eth.account.decrypt(encrypted_key, 'password')
      tx_hash = self.w3.eth.sendRawTransaction(signed_txn.rawTransaction)
      # print('0x'+bytes.hex(tx_hash))
      return "Success"
      
   def getDeliverTime(self, id, address):
      address = self.w3.toChecksumAddress(address)
      return self.contract.functions.getDeliverTime(id, address).call()

   def getFoodState(self, id, address):
      address = self.w3.toChecksumAddress(address)
      return self.contract.functions.getFoodState(id, address).call()
      
   def getFoodCleanTime(self, id, address):
      address = self.w3.toChecksumAddress(address)
      return self.contract.functions.getFoodCleanTime(id, address).call()

   def getStoreName(self, n):
      return self.contract.functions.getStoreName(n).call()

   def getAllFoodID(self, address):
      address = self.w3.toChecksumAddress(address)
      return self.contract.functions.getAllFoodID(address).call()

   def getAllDeliverTime(self, address):
      address = self.w3.toChecksumAddress(address)
      return self.contract.functions.getAllDeliverTime(address).call()

   def getAllCleanTime(self, address):
      address = self.w3.toChecksumAddress(address)
      return self.contract.functions.getAllCleanTime(address).call()

   def checkStore(self, address, account, password):
      address = self.w3.toChecksumAddress(address)
      return self.contract.functions.checkStore(address, account, password).call()
   
   def getlocationTime(self, address):
      address = self.w3.toChecksumAddress(address)
      return self.contract.functions.getlocationTime(address).call()

   def getlocationStatus(self, address):
      address = self.w3.toChecksumAddress(address)
      return self.contract.functions.getlocationStatus(address).call()

   def getStoreOpen(self, address):
      address = self.w3.toChecksumAddress(address)
      return self.contract.functions.getStoreOpen(address).call()
      
   


   # def GetAllFunc(self):
   #    for func in self.contract.all_functions():
   #       print('contract functions: ', func)
         
         

contract = TestNetWorkContract()
# contract.GetAllFunc()

import asyncio
import websockets
import json

connected = set()

async def echo(websocket, path):
   connected.add(websocket)
   try:
      n = await websocket.recv()
      # 登入
      if n=="0":
         check = []
         async for message in websocket:
            n = f"{message}"    
            check.append(n)
            # print(check)
            if len(check)==3:
               checkStore = contract.checkStore(check[0], check[1], check[2])
               # print(checkStore)  
               if(checkStore==True):
                  await websocket.send(json.dumps(checkStore))
                  check.clear()
               elif(checkStore==False):
                  await websocket.send(json.dumps(checkStore))
                  check.clear()
      # 登入後的下一頁
      elif n=="1":
         await websocket.send("check")
         address = await websocket.recv()
         # 重製清理時間
         # contract.refresh(address)
         storeName = contract.getStoreName(address)
         await websocket.send(str(storeName))
      # main.html
      elif n=="2":
         await websocket.send("check")
         address = await websocket.recv()
         storeName = contract.getStoreName(address)
         await websocket.send(str(storeName))

         lis = []
         async for message in websocket:
            n = f"{message}"
            lis.append(n)
            print(n)
            if len(lis)==2:
               id = lis[0]
               address = lis[1]
               # 設定進貨時間
               if contract.getDeliverTime(id, address) == 0:
                  contract.setDeliverTime(id, address) 
                  lis.clear()
               # 設定清洗時間
               elif contract.getDeliverTime(id, address) != 0:
                  if contract.getFoodCleanTime(id, address)==0 and contract.getFoodState(id, address)==1:
                     contract.setFoodCleanTime(id, address)
                     lis.clear()
               # 刪除食物時間
               elif contract.getDeliverTime(id, address) != 0 and contract.getFoodState(id, address)==1 and contract.getFoodCleanTime(id, address)!=0:
                  contract.deleteFood(id, address)
                  lis.clear()
            # 環境清理
            elif len(lis)==1 and len(lis[0])==42:
               address = lis[0]
               contract.setlocationTime(address)
               lis.clear()
      # 食材進貨時間表
      elif n=="3":
         await websocket.send("check")
         address = await websocket.recv()
         print(address)
         dliverTime = contract.getAllDeliverTime(address)
         await websocket.send(json.dumps(dliverTime))
         print(json.dumps(dliverTime))

         ids = contract.getAllFoodID(address)
         await websocket.send(json.dumps(ids))
         print(json.dumps(ids))
      # 食材清洗時間表
      elif n=="4":
         await websocket.send("check")
         address = await websocket.recv()
         print(address)

         CleanTime = contract.getAllCleanTime(address)
         await websocket.send(json.dumps(CleanTime))
         print(json.dumps(CleanTime))

         ids = contract.getAllFoodID(address)
         await websocket.send(json.dumps(ids))
         print(json.dumps(ids))
      # 環境清理時間表
      elif n=="5":
         await websocket.send("check")
         address = await websocket.recv()

         locationTime = contract.getlocationTime(address)
         await websocket.send(json.dumps(locationTime))
         print(json.dumps(locationTime))

         locationStatus = contract.getlocationStatus(address)
         await websocket.send(json.dumps(locationStatus))
         print(json.dumps(json.dumps(locationStatus)))
      # elif n=="6":
      #    await websocket.send("check")
      #    address = await websocket.recv()
      #    storeName = contract.getStoreName(address)
      #    await websocket.send(str(storeName))
      #    # print(address)

      #    async for message in websocket:
      #       n = f"{message}"
      #       address = n 
      #       if contract.getStoreOpen(address) == False:
      #          contract.setStoreOpen(address)
      #          await websocket.send(str(contract.getStoreOpen(address)))
      #       elif contract.getStoreOpen(address) == True:
      #          contract.setStoreClose(address)
      #          await websocket.send(str(contract.getStoreOpen(address)))
               

                     
         
               

   finally:
      connected.remove(websocket)


start_server = websockets.serve(echo, "192.168.68.53", 6001)

asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
