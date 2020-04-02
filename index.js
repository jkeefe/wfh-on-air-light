const isCameraOn = require('is-camera-on')
const fs = require ('fs')
let full_project_path = "/Users/jkeefe/Code/jkeefe-github/wfh-on-air-light"

// this is the camera-checking function, 
// which runs itself every 5 seconds once started
async function check_camera(light_status) {
        
    // new will equal old if nothing has changed
    var new_light_status = light_status
    
    // actually check the camera status
    var camera_status = await isCameraOn();
    // console.log("Camera on? ", camera_status);
    
    // if camera is on, but light is off ...
    if (camera_status && !light_status) {      
        
        // turn lights on 
        await set_lights("on")
        
        // set light status anew
        new_light_status = true
    
        // say so
        // console.log("Turned light on") 
         
    }
    
    // if camera is off, but light is on ...
    if (!camera_status && light_status) {
        
        // turn lights off 
        await set_lights("off")
        
        // set light status anew
        new_light_status = false
    
        // say so
        // console.log("Turned light off") 
    }
    
    // Wait 5 seconds and call this function again
    // passing the new_light_status
    setTimeout(() => {
        check_camera(new_light_status)
    }, 5000)
    
}


// this function turns the lights "on" or "off" by copying
// one of the two circuit python files to the circuit playground express
function set_lights(set_to) {
    return new Promise((resolve, reject) => {
        
        // copy the python file to the circuit playground express
        fs.copyFile(`${full_project_path}/circuitpython/lights_${set_to}.py`, '/Volumes/CIRCUITPY/code.py', (err) => {
            
            if (err) {
                // console.log("Copy failed: ", err)
                resolve()
            } else {
                // console.log(`Lights set to ${set_to}`)
                resolve()
            }
            
        })
        
    })

}

// this function runs once at the start
async function main () {
    
    // start with lights off
    await set_lights("off")
    
    // start the camera checking, passing "false" for 
    // for the current light status (because they're off)
    check_camera(false)
    
}

main()