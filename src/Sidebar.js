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
                <div>
                <input type="checkbox" id="bikeshop" name="bikeshop" value="bikeshop"></input>
                <label for="bikeshop">Bike Shops</label>
                </div>
                <div>
                <input type="checkbox" id="parking" name="parking" value="parking"></input>
                <label for="parking">Bike Parking</label>
                </div>
                <div>
                <input type="checkbox" id="toolstation" name="toolstation" value="toolstation"></input>
                <label for="toolstation">Tool Station</label>
                </div>
            </div>
            <div className="layers">
                <h3>Connector Routes</h3>
                <div>
                <input type="checkbox" id="familyfriendly" name="familyfriendly" value="familyfriendly"></input>
                <label for="familyfriendly">Family Friendly</label>
                </div>
                <div>
                <input type="checkbox" id="intermidiate" name="intermidiate" value="intermidiate"></input>
                <label for="intermidiate">Intermidiate</label>
                </div>
                <div>
                <input type="checkbox" id="advanced" name="advanced" value="advanced"></input>
                <label for="advanced">Advanced</label>
                </div>
            </div>

        </div>
    )
};

export default Sidebar;