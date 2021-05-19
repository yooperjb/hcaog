import React, {useState} from 'react';
import logo from "./images/logo.png"

const Sidebar = () => {

    return (
        <div className="sidebar">
            <div className="logo">
            <img src={logo} alt="HCAGO Logo" />
            </div>

            <div className="layers">
                <h3>Existing Bike Routes</h3>
                <div>
                <input type="checkbox" id="class1" name="class1" value="class1"></input>
                <label for="class1">Class I</label>
                </div>
                <div>
                <input type="checkbox" id="class2" name="class2" value="class2"></input>
                <label for="class2">Class II</label>   
                </div>
                <div>
                <input type="checkbox" id="class3" name="class3" value="class3"></input>
                <label for="class3">Class III</label>
                </div>
                <div>
                <input type="checkbox" id="trail" name="trail" value="trail"></input>
                <label for="trail">Trails</label>
                </div>
            </div>

        </div>
    )
};

export default Sidebar;