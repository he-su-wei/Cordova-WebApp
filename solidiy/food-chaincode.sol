pragma solidity >=0.5.12;
pragma experimental ABIEncoderV2;
contract foodChain{
    address[] public allStore;
    
    //食材表格
    struct foodList{
        string id;
        address storeAddress;
        uint status; //啟用狀態
        uint inputTime; //食材進貨
        uint clearTime; //食材清洗
        bool isVaild;
    }
    //商店總表
    struct store{
        address storeAddress;
        string private_key;
        string storeName;
        string account;
        string passWd;
        bool isVaild; //帳戶是否啟用
        bool isOpen;
        int i; //紀錄 foodList 筆數
        mapping(string => foodList) foodLists;
    }
    mapping(address => store)public stores;

    struct timeList{  //用於前端呈現
        string[] foodID;
        uint[] inputTime;
        uint[] clearTime;
    }
    mapping(address => timeList) timeLists;

    //前端顧客查看店家列表    
    struct allStoreInfo{
        address storeAddress;
        string storeName;
        string iconName; //UI icon img Name
        bool isOpen;
        bool isClear;
    }
    mapping(address => allStoreInfo) public allStoreInfos;
    
    //店家註冊
    function setStore(address _storeAddress, string memory _private_key, string memory _storeName, string memory _account, string memory _passWd, string memory _iconName) public{
        stores[_storeAddress].storeAddress = _storeAddress;
        stores[_storeAddress].private_key = _private_key;
        stores[_storeAddress].storeName = _storeName;
        stores[_storeAddress].account = _account;
        stores[_storeAddress].passWd = _passWd;
        stores[_storeAddress].i = 0;
        stores[_storeAddress].isVaild = true;
        stores[_storeAddress].isOpen = false;
        
        allStoreInfos[_storeAddress].storeAddress = _storeAddress;
        allStoreInfos[_storeAddress].storeName = _storeName;
        allStoreInfos[_storeAddress].iconName = _iconName;
        allStoreInfos[_storeAddress].isClear = false;

        allStore.push(_storeAddress); //紀錄全部店家之address
    }
    
    //店家登入判斷
    function checkStore(address _storeAddress, string memory _account, string memory _passWd)public view returns(bool){
        if(keccak256(abi.encodePacked(stores[_storeAddress].account)) == keccak256(abi.encodePacked(_account))){
            if(keccak256(abi.encodePacked(stores[_storeAddress].passWd)) == keccak256(abi.encodePacked(_passWd))){
                return true;
            }
        }else{
            return false;
        }
    }
    
    //回傳店家圖片
    function getStoreIconName(address _storeAddress) public view returns(string memory){
        return(allStoreInfos[_storeAddress].iconName);
    }
    
    //回傳店家名稱
    function getStoreName(address _storeAddress) public view returns(string memory){
        return(stores[_storeAddress].storeName);
    }
    
    //回傳店家私密金鑰
    function getKey(address _storeAddress) public view returns(string memory){
        return(stores[_storeAddress].private_key);
    }
    
    //簡單的店家權限設置
    modifier onlyStore(address _add){
        require(stores[_add].isVaild == true, "No permission!");
        _;
    }
    
    //開始營業
    function setStoreOpen(address _storeAddress) public onlyStore(_storeAddress){
        stores[_storeAddress].isOpen = true;
        allStoreInfos[_storeAddress].isOpen = true;
    }
    //結束營業
    function setStoreClose(address _storeAddress) public onlyStore(_storeAddress){
        stores[_storeAddress].isOpen = false;
        allStoreInfos[_storeAddress].isOpen = false;
    }
    //取得營業狀態
    function getStoreState(address _storeAddress) public view returns(bool){
        return(stores[_storeAddress].isOpen);
    }
    
    //食材進貨輸入
    function setDeliverTime(string memory _id, address _storeAddress) public onlyStore(_storeAddress){
        require(stores[_storeAddress].foodLists[_id].isVaild != true);
        stores[_storeAddress].foodLists[_id] = foodList({ 
            id: _id,
            storeAddress: _storeAddress,
            status: 1,
            inputTime: now,
            clearTime: 0,
            isVaild: true
        });
        stores[_storeAddress].i = stores[_storeAddress].i+1;
        
        //將時間與食材資料填入 timeLists
        timeLists[_storeAddress].foodID.push(_id);
        timeLists[_storeAddress].inputTime.push(stores[_storeAddress].foodLists[_id].inputTime);
    }
    
    // function getFoodInfo(address _storeAddress, string memory _id) public view returns(foodList memory){
    //     return(stores[_storeAddress].foodLists[_id]);
    // }
    //取得該店家所有登錄的食材名稱
    function getAllFoodID(address _storeAddress) public view returns(string[] memory){
        return(timeLists[_storeAddress].foodID);
    }
    //取得單筆食材進貨時間
    function getDeliverTime(string memory _id, address _storeAddress) public view returns(uint){
        return (stores[_storeAddress].foodLists[_id].inputTime);
    }
    //取得該店家所有登錄的食材進貨時間
    function getAllDeliverTime(address _storeAddress) public view returns(uint[] memory){
        return(timeLists[_storeAddress].inputTime);
    }
    //登錄食材清洗時間
    function setFoodCleanTime(string memory _id, address _storeAddress) public onlyStore(_storeAddress){
        require(stores[_storeAddress].foodLists[_id].status == 1);  //已有食材進貨紀錄
        require(stores[_storeAddress].foodLists[_id].clearTime == 0); //未曾登入過食材清洗
        stores[_storeAddress].foodLists[_id].clearTime = now;
        
        //重新排列 timeList中食材清洗時間
        delete timeLists[_storeAddress].clearTime;
        for(uint j=0;j<timeLists[_storeAddress].foodID.length;j++){
            timeLists[_storeAddress].clearTime.push(stores[_storeAddress].foodLists[timeLists[_storeAddress].foodID[j]].clearTime);
        }
    }
    //取得單筆食材清洗時間
    function getFoodCleanTime(string memory _id, address _storeAddress) public view returns(uint){
        return (stores[_storeAddress].foodLists[_id].clearTime);
    }
    //取得單筆食材狀態
    function getFoodState(string memory _id, address _storeAddress)public view returns(uint){
        return (stores[_storeAddress].foodLists[_id].status);
    }
    //取得該店家所有登錄的食材的清洗時間
    function getAllCleanTime(address _storeAddress) public view returns(uint[] memory){
        return(timeLists[_storeAddress].clearTime);
    }
    
    //刪除食材紀錄
    function deleteFood(string memory _id, address _storeAddress) public onlyStore(_storeAddress){
        require(stores[_storeAddress].foodLists[_id].status == 1);
        delete stores[_storeAddress].foodLists[_id];
        stores[_storeAddress].i = stores[_storeAddress].i-1;
        
        //將指定的食材資料在timeList的三個array中移除
        uint delT;
        for(uint j=0;j<timeLists[_storeAddress].foodID.length;j++){
            if(keccak256(abi.encodePacked(timeLists[_storeAddress].foodID[j])) == keccak256(abi.encodePacked(_id))){
                delete timeLists[_storeAddress].foodID[j];
                delete timeLists[_storeAddress].inputTime[j];
                delete timeLists[_storeAddress].clearTime[j];
                
                delT = j; //紀錄刪除點
                break;
            }
        }
        //重新放置 array 位置(將刪除的index覆蓋掉)
        for(uint j=delT;j<timeLists[_storeAddress].foodID.length-1;j++){
            timeLists[_storeAddress].foodID[j] = timeLists[_storeAddress].foodID[j+1];
            timeLists[_storeAddress].inputTime[j] = timeLists[_storeAddress].inputTime[j+1];
            timeLists[_storeAddress].clearTime[j] = timeLists[_storeAddress].clearTime[j+1];
        }
        timeLists[_storeAddress].foodID.length--;
        timeLists[_storeAddress].inputTime.length--;
        timeLists[_storeAddress].clearTime.length--;
    }
    
    //環境清理時間表
    struct locationTime{
        address storeAddress;
        uint currentTime;
        uint futureTime;
        bool status;
    }
    mapping(address => locationTime) public locationTimes;
    
    //登錄店家環境清洗時間
    function setlocationTime(address _storeAddress) public onlyStore(_storeAddress){
        locationTimes[_storeAddress] = locationTime({
            storeAddress: _storeAddress,
            currentTime: now,
            futureTime: now+6480,
            status: true
        });
        
        allStoreInfos[_storeAddress].isClear = true;
    }
    
    //取得該店家之環境清洗時間
    function getlocationTime(address _storeAddress) public view returns(uint){
        return (locationTimes[_storeAddress].currentTime);
    }
    
    function getlocationStatus(address _storeAddress) public view returns(bool){
        return (locationTimes[_storeAddress].status);
    }
    
    //前端登入畫面中"繼續"呼叫的重製方法
    function refresh(address _storeAddress) public onlyStore(_storeAddress){
        require(now >= locationTimes[_storeAddress].futureTime);
        locationTimes[_storeAddress].currentTime = now;
        locationTimes[_storeAddress].status = false;
    }
    
    //使用者
    struct user{
        string account;
        string userName;
        string passWd;
    }
    mapping(string => user)public users;
    
    //使用者註冊
    function setUser(string memory _userName, string memory _account, string memory _passWd) public{
        users[_account] = user({
            account: _account,
            userName: _userName,
            passWd: _passWd
        });
    }
    
    //使用者登入
    function checkUser(string memory _account, string memory _passwd) public view returns(bool){
        if(keccak256(abi.encodePacked(users[_account].passWd)) == keccak256(abi.encodePacked(_passwd))){
            return true;
        }else{
            return false;
        }
    }
    
    //取得所有店家地址
    function getAllStore() public view returns(address[] memory){
        return(allStore);
    }
    //前端py透過上一個方法取得的店家address寫一個迴圈
    function storeInfoForUser(address _storeAddress)public view returns(allStoreInfo memory){
        return(allStoreInfos[_storeAddress]);
    }
   
    //用戶評論
    struct allComment{
        uint id;
        address storeAddress;
        string storeName;
        string[] userName;
        string[] comment;
    }
    mapping(address => allComment)public allComments;
    
    //匯入評論
    function setComment(address _storeAddress, string memory _storeName, string memory _userName, string memory _comment) public{
        allComments[_storeAddress].storeAddress = _storeAddress;
        allComments[_storeAddress].storeName = _storeName;
        allComments[_storeAddress].id++;
        allComments[_storeAddress].userName.push(_userName);
        allComments[_storeAddress].comment.push(_comment);
    }
    
    //取得評論
    function getComment(address _storeAddress) public view returns(uint, string[] memory, string[] memory){
        return(allComments[_storeAddress].id, allComments[_storeAddress].userName, allComments[_storeAddress].comment);
    }
}