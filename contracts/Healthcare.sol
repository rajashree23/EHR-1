



pragma solidity >=0.4.21 <0.7.0;
pragma experimental ABIEncoderV2;
/**
 * @title Roles
 * @dev Library for managing addresses assigned to a Role.
 */
library Roles {
    struct Role {
        mapping (address => bool) bearer;
    }

    /**
     * @dev Give an account access to this role.
     */
    function add(Role storage role, address account) internal {
        require(!has(role, account), "Roles: account already has role");
        role.bearer[account] = true;
    }

    /**
     * @dev Remove an account's access to this role.
     */
    function remove(Role storage role, address account) internal {
        require(has(role, account), "Roles: account does not have role");
        role.bearer[account] = false;
    }

    /**
     * @dev Check if an account has this role.
     * @return bool
     */
    function has(Role storage role, address account) internal view returns (bool) {
        require(account != address(0), "Roles: account is the zero address");
        return role.bearer[account];
    }
}


contract HealthCare {
  using Roles for Roles.Role;
  Roles.Role private superAdmins;
  Roles.Role private admin;
  Roles.Role private hospitalAdmins;
  Roles.Role private receptionist;
  Roles.Role private doctor;
  Roles.Role private patient;
  Roles.Role private lab;

//   Roles.Role private pharmacist;
//   Roles.Role private radiologist;
//   Roles.Role private pathologist;

  constructor() public {
    superAdmins.add(msg.sender);
  }
 //StructureOfPatient'sRecord
  struct patientRecords{
    address patient;
    string patName;
    
    
}
struct doctorRecords{
    address doctor;
    string docName;
    
    
}
struct labRecords{
    address lab;
    string  labName;
    
    
}
struct receptionistRecords{
  address rec;
  string recName;
}
struct stateAdmin{
  address stateadmin;
  string name;
  string state;
}
struct hospitalAdmin{
  address hosAdmin;
  string name;
  string hospital;
}

   mapping(address=>patientRecords) patientDetails;
   mapping(address=>doctorRecords) doctorDetails;
   mapping(address=>labRecords) labDetails;
   mapping(address=>receptionistRecords)recDetails;
   mapping(address=>hospitalAdmin)hosAdminDetails;
   mapping(address=>stateAdmin)stateAdminDetails;

   mapping(address=>hospitalAdmin[])hosAdmin;


  address[] public patientAccounts;
  address[] public labAccounts;
  address[] public doctorAccounts;
  address[] public recAccounts;
  address[] public stateAdminAccounts;
  address[] public hosAdminAccounts;
  
  
//returning
function hosAdminForState()external view returns(hospitalAdmin[] memory){
  return hosAdmin[msg.sender];
}
  
//addNetworkMembers
  function addHospitalAdmins(address _newHospitalAdmin,string calldata _name, string calldata _hospital) external onlyStateAdmin(){
        hospitalAdmins.add(_newHospitalAdmin);
        hosAdminDetails[_newHospitalAdmin].hosAdmin=_newHospitalAdmin;
        hosAdminDetails[_newHospitalAdmin].name=_name;
        hosAdminDetails[_newHospitalAdmin].hospital=_hospital;
        
         hosAdminAccounts.push(_newHospitalAdmin);

         hosAdmin[msg.sender].push(hosAdminDetails[_newHospitalAdmin]);

  }
  function addStateAdmin(address _newStateAdmin,string calldata _name, string calldata _state) external onlysuperAdmin(){
          admin.add(_newStateAdmin);
          stateAdminDetails[_newStateAdmin].stateadmin=_newStateAdmin;
          stateAdminDetails[_newStateAdmin].name=_name;
          stateAdminDetails[_newStateAdmin].state=_state;

          stateAdminAccounts.push(_newStateAdmin);
  }

   function addReceptionist(address _recAddress,string calldata name) external onlyHospitalAdmins(){
        receptionist.add(_recAddress);
        recDetails[_recAddress].rec = _recAddress;
        recDetails[_recAddress].recName = name;

        recAccounts.push(_recAddress);
       
  }
  
  function addPatient(address _newPatient,string calldata name) external onlyReceptionist(){
        patient.add(_newPatient);
        patientDetails[_newPatient].patient = _newPatient;
        patientDetails[_newPatient].patName=name;

        
        patientAccounts.push(_newPatient);
  }
  function addDoctor(address _newDoctor,string calldata name) external onlyHospitalAdmins(){
        doctor.add(_newDoctor);
        doctorDetails[_newDoctor].doctor = _newDoctor;
        doctorDetails[_newDoctor].docName = name;
        

        
        doctorAccounts.push(_newDoctor);
 
  }
  
  function addLab(address _newLab,string calldata name) external onlyHospitalAdmins(){
        lab.add(_newLab);
        labDetails[_newLab].lab = _newLab;
        labDetails[_newLab].labName = name;

        
        labAccounts.push(_newLab);
  }


//   function addPharmacist(address _newPharmacist) external onlyHospitalAdmins(){
//         pharmacist.add(_newPharmacist);
//   }
//   function addRadiologist(address _newRadiologist) external onlyHospitalAdmins(){
//         radiologist.add(_newRadiologist);
//   }
//   function addPathologist(address _newPathologist) external onlyHospitalAdmins(){
//         pathologist.add(_newPathologist);
//   }

  //removeNetworkMembers
//   function removeHospitalAdmins(address _oldHospitalAdmin) external onlysuperAdmin(){
//         hospitalAdmins.remove(_oldHospitalAdmin);
//   }
//   function removeReceptionist(address _oldDoctor) external onlyHospitalAdmins(){
//         receptionist.remove(_oldDoctor);
//   }
  

//   function removePatient(address _oldPatient) external onlyReceptionist(){
//         patient.remove(_oldPatient);
//   }

//   function removeDoctor(address _oldDoctor) external onlyHospitalAdmins(){
//         doctor.remove(_oldDoctor);
//   }
//   function removeLab(address _oldDoctor) external onlyHospitalAdmins(){
//         doctor.remove(_oldDoctor);
//   }
  //verify network members
 function verifyPatient(address _pat) external view returns(bool){
     return patient.has(_pat);
 }

 function verifyDoctor(address _doc) public view returns(bool){
     return doctor.has(_doc);
 }

 function verifyTechnician(address _tech) external view returns(bool){
     return lab.has(_tech);
 }

 function verifyReceptionist(address _recp) external view returns(bool){
     return receptionist.has(_recp);
 }
function verifySuper(address _sup) external view returns(bool){
     return superAdmins.has(_sup);
 }
function verifyAdmin(address _admin) external view returns(bool){
     return hospitalAdmins.has(_admin);
 }
 function verifyStateAdmin(address _stateadmin) external view returns(bool){
     return admin.has(_stateadmin);
 }

//returning names;
function returnPatName(address pat)external view returns(string memory){
  return patientDetails[pat].patName;
}
function returnDocName(address doc)external view returns(string memory){
  return doctorDetails[doc].docName;
}
function returnLabName(address labAdd)external view returns(string memory){
  return labDetails[labAdd].labName;
}

//   function removePharmacist(address _oldPharmacist) external onlyHospitalAdmins(){
//         pharmacist.remove(_oldPharmacist);
//   }

//   function removeRadiologist(address _oldRadiologist) external onlyHospitalAdmins(){
//         radiologist.remove(_oldRadiologist);
//   }

//   function removePathologist(address _oldPathologist) external onlyHospitalAdmins(){
//         pathologist.remove(_oldPathologist);
//   }


//returning stateadmin details

//UnauthorizedAccessRestriction
  modifier onlysuperAdmin(){
    require(superAdmins.has(msg.sender),"Only Admins can add StateAdmins");
    _;
  }
  modifier onlyStateAdmin(){
    require(admin.has(msg.sender),"Only admin can add hospital admin");
    _;
  }
   modifier onlyReceptionist(){
    require(receptionist.has(msg.sender),"Only Receptionist can add Patients");
    _;
  }

  modifier onlyHospitalAdmins(){
    require(hospitalAdmins.has(msg.sender),'Only Hospital Administrators can perform such Operation');
    _;
  }

  modifier onlyDoctor(){
    require(doctor.has(msg.sender),"Only Registered Doctor can add Patients");
    _;
  }
 modifier onlyLab(){
    require(doctor.has(msg.sender),"Only Registered Doctor can add Patients");
    _;
  }

//   modifier onlyPharmacist(){
//     require(pharmacist.has(msg.sender),"Only Registered Pharmacist can perform such Operation");
//     _;
//   }

//   modifier onlyRadiologist(){
//     require(radiologist.has(msg.sender),"Only Registered Radiologist can perform such Operation");
//     _;
//   }

//   modifier onlyPathologist(){
//     require(pathologist.has(msg.sender),"Only Registered Pathologist can perform such Operation");
//     _;
//   }

 

    struct Doc{
       string[]ipfs;
      
       address[]patients;
     
    }
struct PDoc{
 string[] permissionIpfs;
       address[] permissionPat;
} 
struct LDoc{
 string[] permissionIpfs;
       address[] permissionPat;
}  

    struct Lab{
       string[]ipfs;
      
       address[]patients;
       
    }
      struct Pat{
        string[] role;
        string[] ipfs;
        address[] people;

}
    mapping(string => string) timeStamp;
    mapping(address => Lab)labProfile;
    mapping(address=>Doc)docProfile;
    mapping(address=>Pat)patProfile;
    mapping(string => mapping(address => string)) public key;
mapping(address => PDoc)  permissionDoc;
mapping(address=> LDoc)  permissionLab;
  
   mapping(address =>mapping(string=>uint256))patDoc;
   mapping(address =>mapping(string=>uint256))patLab;

    function sendIPFS(
        string memory hash,
        address patientAdd,
        string memory aeskey,string memory time
    ) public {
       
         patProfile[patientAdd].ipfs.push(hash);
         timeStamp[hash]=time;
        
         patProfile[patientAdd].people.push(msg.sender);
        
         key[hash][patientAdd] = aeskey;

         if(verifyDoctor(msg.sender))
         {
         docProfile[msg.sender].ipfs.push(hash);
           
        
         docProfile[msg.sender].patients.push(patientAdd);
         patProfile[patientAdd].role.push("doctor");
         
                
         }
        else
         {
           labProfile[msg.sender].ipfs.push(hash);
          
           labProfile[msg.sender].patients.push(patientAdd);
           patProfile[patientAdd].role.push("lab");
         
         }
        


    }

function permitOrNot(string memory hash, address user)public view returns(string memory){
   return key[hash][user];
}


    function retrieveKey(string memory hash)
        public
        view
        returns (string memory)
    {

        return  key[hash][msg.sender];
    }
    function createPermission(string memory hash, string memory aeskey,address user)
        public
    {   
         if(verifyDoctor(user))
         {
          patDoc[user][hash]=permissionDoc[user].permissionIpfs.length;
          permissionDoc[user].permissionIpfs.push(hash);
          permissionDoc[user].permissionPat.push(msg.sender);
           
       }
       else

         {
          patLab[user][hash]=permissionLab[user].permissionIpfs.length;
          permissionLab[user].permissionIpfs.push(hash);
          permissionLab[user].permissionPat.push(msg.sender);
           
       }
        
        key[hash][user] = aeskey;

         
    }

      function removePermission(string memory hash, address user)
        public
    {
        key[hash][user] = "";
        
        if(verifyDoctor(user))
         {
          uint256 pos= patDoc[user][hash];
          permissionDoc[user].permissionIpfs[pos]="";
          permissionDoc[user].permissionPat[pos]=address(0);
           
       }
       else

         {

           uint256 pos= patLab[user][hash];
          permissionLab[user].permissionIpfs[pos]="";
          permissionLab[user].permissionPat[pos]=address(0);
           
       }
        
    }
    
    




//patient profile display

     function recordPatCount() public view  returns(uint){
           return patProfile[msg.sender].ipfs.length;
     }
     function recordPatDetails(uint z) public view returns(string memory,string memory,string memory,address ){
    
             return (patProfile[msg.sender].ipfs[z],timeStamp[patProfile[msg.sender].ipfs[z]],patProfile[msg.sender].role[z],patProfile[msg.sender].people[z]);
     }
 

    
//doctor profile display

function recordDocCount() public view  returns(uint){
           return docProfile[msg.sender].ipfs.length;
     }

function recordDocDetails(uint z) public view returns(string memory,string memory,address ){
    
             return (docProfile[msg.sender].ipfs[z],timeStamp[docProfile[msg.sender].ipfs[z]],docProfile[msg.sender].patients[z]);
     }
function recordPDocCount() public view  returns(uint){
           return permissionDoc[msg.sender].permissionIpfs.length;
     }

function recordPDocDetails(uint z) public view returns(string memory,address ){
    
             return (permissionDoc[msg.sender].permissionIpfs[z],permissionDoc[msg.sender].permissionPat[z]);
     }


//lab technician profile

function recordLabCount() public view  returns(uint){
           return labProfile[msg.sender].ipfs.length;
     }

function recordLabDetails(uint z) public view returns(string memory,string memory,address ){
    
             return (labProfile[msg.sender].ipfs[z],timeStamp[labProfile[msg.sender].ipfs[z]],labProfile[msg.sender].patients[z]);
     }
function recordPLabCount() public view  returns(uint){
           return permissionLab[msg.sender].permissionIpfs.length;
     }

function recordPLabDetails(uint z) public view returns(string memory,address ){
    
             return (permissionLab[msg.sender].permissionIpfs[z],permissionLab[msg.sender].permissionPat[z]);
     }




}