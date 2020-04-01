const isCameraOn = require('is-camera-on')
const fs = require ('fs')
let saved_status = require('./saved_status')

let full_project_path = `/Users/jkeefe/Code/jkeefe-github/wfh-on-air-light`

async function lights_action (file_name, new_currently) {
    
    // copy the python file to the circuit playground express
    fs.copyFile(`${full_project_path}/circuitpython/${file_name}`, '/Volumes/CIRCUITPY/code.py', (err) => {
        
        if (err) {
            console.log("Copy failed.")
        }
        
        // save the current status
        saved_status.currently_on = new_currently;
        var data = JSON.stringify(saved_status)    
        fs.writeFile(`${full_project_path}/saved_status.json`, data, (err) => {
            
            if (err) {
                console.log("JSON write failed")
            }
            
            return true
        })
        
    })
    
}

async function main () {
    
    // status returns true if camera is on
    var status = await isCameraOn();
    console.log("Camera on? ", status);    
    
    if (status && saved_status.currently_on == false) {      
        // camera is newly on  
        await lights_action('lights_on.py', true)   
        console.log("Turned light on")   
    }

    if (!status && saved_status.currently_on == true) {
        // camera is newly off
        await lights_action('lights_off.py', false)
        console.log("Turned light off")  
    }
    
}

main()