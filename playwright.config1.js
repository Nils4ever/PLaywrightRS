// @ts-nocheck
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/** 
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',
  retries : 1,
  workers :0 ,
  timeout: 40*1000,
    expect: {
      timeout: 5000
    },

    
  reporter : "html",
  projects:[
    {
      name : 'firefox',
       use: {
    browserName : "firefox",
    headless : true,
    screenshot :'on',
    trace: 'on'
    

  },
    },
   
    {
 name : 'chrome',
 use: {
    browserName : "chromium",
    headless : false,
    screenshot :'on',
    trace: 'on',
     // ...devices['galaxy']
    // ignoreHttpsErrors:true [SSL error handling]
    //permission : ['geolocation'](if google wants to know the location)
    //video:'retain-on-failure'(take video recording when its fail)
     },
    }
   
  
 ]

});
module.exports=config
