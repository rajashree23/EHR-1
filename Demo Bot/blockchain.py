from flask import Flask
app = Flask(__name__)
from selenium import webdriver
import time 
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains


@app.route('/hss')
def hello_wor():
    print("hello rahul")
    #executable_path = "/home/monalisha/Desktop/blockchain a-z/ChromeDriver/chromedriver"
    #os.environ["webdriver.chrome.driver"] = executable_path

    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument('--user-data-dir=./User_Data')
    #capabilities = DesiredCapabilities.CHROME.copy()
    #capabilities['acceptSslCerts'] = True
    #capabilities['acceptInsecureCerts'] = True

    #chrome_options.add_extension('/home/monalisha/Documents/MetaMask_v7.7.8.crx')


 
    browser = webdriver.Chrome("/home/monalisha/Desktop/ChromeDriver/chromedriver",chrome_options=chrome_options)
    
    
    browser.maximize_window()
    
    
    browser.get('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/popup.html')
    time.sleep(3)
    
    WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.ID,'password'))).send_keys("rahulmona")
    time.sleep(3)
    browser.find_element_by_xpath('//*[@id="app-content"]/div/div[4]/div/div/button').click()
    
    
    browser.get('http://localhost:3000/')
    time.sleep(5)  
    
    patient_login  = browser.find_element_by_xpath('//*[@id="patient"]/div/div[2]/div[2]/button')
    
    patient_login.click()
    
    
    
    time.sleep(4)

    permit= browser.find_element_by_id("permit")
    #actions1 = ActionChains(browser)
    #p1=actions1.move_to_element(permit)
    permit.click()
    
    time.sleep(4)
    
    username = "0x6BE4F4658d8c27b253C59797a791FE39d64Cf78A"
    WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.ID,'input'))).send_keys(username)
    # a=browser.find_element_by_xpath("//input[@id ='input']").click()
    #actions2 = ActionChains(browser)
    #p2=actions2.move_to_element(a)
    #a.send_keys(username)
    
    
    
    submit= WebDriverWait(browser, 20).until(EC.element_to_be_clickable((By.ID, "permitsubmit")))

    #actions3 = ActionChains(browser)
    #p3=actions3.move_to_element(submit_a)
    submit.click()
    
    time.sleep(4)
    browser.get('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/popup.html')
    print(browser.current_url)
    
    #time.sleep(2)
    #browser.get('chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/popup.html')
    WebDriverWait(browser, 20)
    #x_path = browser.find_element_by_css_selector('[data-tb-test-id="page-container-footer-next"]')
    x_path = WebDriverWait(browser, 20).until(EC.element_to_be_clickable((By.XPATH, '//*[@id="app-content"]/div/div[3]/div/div[4]/footer/button[2]')))
    time.sleep(2)
    #x_path=browser.find_element_by_xpath("//button[@data-test-id='page-container-footer-next']")
    #actions4 = ActionChains(browser)
    #p4=actions4.move_to_element(x_path)
    x_path.click()
    time.sleep(5) 
    
    #browser.back()
    
    #link=browser.find_element_by_id("download")
    #actions5 = ActionChains(browser)
    #p5=actions5.move_to_element(link)
    #link.click() 
    #time.sleep(5)    

    
    #browser.get("http://localhost:3000/patient/viewrecords/permitdoc")
    #browser.get("http://localhost:3000/patient/viewrecords/permitdoc")
    #time.sleep(5);
    

   

    browser.close()
    
    

    return "This is how you can give a permission"
app.run()
