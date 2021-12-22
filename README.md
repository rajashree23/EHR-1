# EHR- Electronic Health Record

The app is hosted at :point_right:https://ehr-app-f70e6.web.app/

## Contents
- [Problem Statement](Problem-Statement)
- [Solution](Solution)
- [Website Glimpses](Website-Glimpses)
- [Components](Components)
- [Use Case](Use-Case)
- [Tech Stack](url)
- [Encryption Decryption Flow](Encryption-Decryption-Flow)
- [Installation](Installation)


### Problem Statement

EHR generally contain highly-sensitive and critical data related to patients, which is frequently shared among clinicians, radiologists, healthcare providers, pharmacists, and researchers, for effective diagnosis and treatment. Hence, we may use blockchain technology for accessing and managing the privacy and security of patient data and history in clinical practices.

### Solution

A blockchain based decentralised web application which will provide privacy and security to the patients’ health record using AES encryption ,Access Control and IPFS. The system gives appropriate scope over a health record only on patient’s permission.

### Website Glimpses
![SS_1](https://user-images.githubusercontent.com/33730790/145254193-96841d59-2266-43e7-8c59-7e4eada3430d.png)


![Screenshot (266)](https://user-images.githubusercontent.com/33730790/145564104-4be338dd-84c0-4c5e-aa6b-386a86023411.png)

![Screenshot (265)](https://user-images.githubusercontent.com/33730790/145564118-891cd563-04ef-4ba7-8c90-770cc2565a64.png)

![Screenshot (264)](https://user-images.githubusercontent.com/33730790/145564134-17fedcc3-72d2-4637-9cb1-872184c7538d.png)



### Components 

Built a blockchain-based decentralized web app <br/>
- Provides privacy <br/>
- Cost reduction compared to current EHR models <br/>
- No third-party involvement <br/>

Our application secures the initial stage of registration <br/>
- Access Control using Open Zeppelin to maintain hierarchy similar to current system.
- Private network
- Track of records 

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


### Use Case <br/>
- The public key is the identification of every user in the network.
- Registered by Admin
- One-click login using Metamask
- Doctor or Lab Technician uploads the report
- Only patient has the access to it
- Can see the encrypted report if not permitted.
- Report can only be viewed in the web app itself if patient gives permission.
- Patient can revoke permission at any time.

### Tech Stack
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


### Encryption Decryption Flow

![ehr1](https://user-images.githubusercontent.com/33730790/145253215-3523348c-47f8-4a75-88d1-a11ba7c0b6be.png)




### Installation

- Clone the repo
- Run **npm install**
- Run **npm start** to start the server
- Open http://localhost:3000/ in browser
- Set metamask to **Ropsten Testnet**





