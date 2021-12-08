# SS45_ACCESS_DENIED


**Problem statement**<br/>
EHR generally contain highly-sensitive and critical data related to patients, which is frequently shared among clinicians, radiologists, healthcare providers, pharmacists, and researchers, for effective diagnosis and treatment. Hence may use blockchain technology for accessing and managing the privacy and security of patient data and history in clinical practices.

**Solution**<br/>
A blockchain based decentralised web application which will provide privacy and security to the patients’ health record using AES encryption ,Access Control and IPFS. The system gives appropriate scope over a health record only on patient’s permission.

**Website Glimpses**


**Components**<br/>
Built a blockchain-based decentralized web app<br/>
- Provides privacy
- Cost reduction compared to current EHR models
- No third-party involvement

Our application secures the initial stage of registration <br/>
- Access Control using Open Zeppelin to maintain hierarchy similar to current system.
- Private network
- - Track of records 

We have an one-click login <br/>
- Metamask Wallet
- QR code for a user-friendly experience.  

Our second stage of security<br/>
- Strong cryptography of ethereum
- Multi-level AES encryption(report is encrypted and stored in IPFS)
- Control lies in the hands of the patient
- View reports in the app itself
- Screenshot can’t be taken so as to prevent breach of data

User friendly and easy to use<br/>
- User is unaware of the background encryption/decryption 
- Normal web app interface
- Demo bot to explain the functionalities to the first time users
- QR code scanner
- Segregated data for both doctor and lab
            
Our third stage of security<br/>
- IPFS (decentralised ,content addressing) (for storing encrypted report)
- Encrypted AES key (decrypted only by unique private key)  stored on blockchain


**Use Case**<br/>
- The public key is the identification of every user in the network.
- Registered by Admin
- One-click login using Metamask
- Doctor or Lab Technician uploads the report
- Only patient has the access to it
- Can see the encrypted report if not permitted.
- Report can only be viewed in the web app itself if patient gives permission.
- Patient can revoke permission at any time.

**Tech Satck**
- ReactJS
- Bootstrap
- Web3js
- Blockchain (Ethereum)                   
- IPFS for decentralised file storage
- AES for symmetric encryption
- OpenZeppelin for Access Control
- Selenium for Demo Bot
- Truffle-react framework.
- Metamask Wallet


**Encryption Decryption Flow**
![image](https://drive.google.com/uc?export=view&id=/1cy-VCjGc8UnNhYKdadeBMj5Fq52cWlAr)


**Installation**

- Clone the repo
- Run **npm install**
- Run **npm start** to start the server
- Open http://localhost:3000/ in browser
- Set metamask to **Ropsten Testnet**





