import React, {useState} from 'react';
import {useLayerVisibility, actions} from "../contexts/LayerVisibilityContext";
import logo from "../images/logo.png"

const Sidebar = () => {
    
    const [layerVisibility, dispatch] = useLayerVisibility();

    const onCheckboxChange = (e) => dispatch(actions.toggleVisibility(e.target.id));
    return (
        <div className="sidebar">
            <div className="logo">
            <img src={logo} alt="HCAGO Logo" />
            </div>
            <div>
                <p>Humboldt County offers incredible bike opportunities for visitors and locals alike. Find a new way to commute to work, explore the countryside, an adventurous mountain bike ride, and more!</p>
                <p>To learn more about Humboldt County Bike Routes click <a target="_blank" href="https://www.hcaog.net/documents/humboldt-regional-bicycle-plan-2018">here</a>.</p>
            </div>

            <div className="layers">
                <h3>Existing Bike Routes</h3>
                <div title="A separated paved path for bicycles and pedestrians.">
                <input type="checkbox" id="class1" name="class1" onChange={onCheckboxChange} checked={layerVisibility.class1}></input>
                <label for="class1">Class I Bike Route</label>
                </div>
                <div title="A restricted right-of-way for bicycles along the side of a street (typically 5 feet wide). A thick white line separates the auto and bike lanes. Motor vehicles may merge into these lanes to make turns.">
                <input type="checkbox" id="class2" name="class2" onChange={onCheckboxChange} checked={layerVisibility.class2}></input>
                <label for="class2">Class II Bike Route</label>   
                </div>
                <div title="A travel lane shared by bicycles and motor vehicles designated only by signs or pavement markings. This type of facility mainly informs motorists of preferred cycling routes.">
                <input type="checkbox" id="class3" name="class3" onChange={onCheckboxChange} checked={layerVisibility.class3}></input>
                <label for="class3">Class III Bike Route</label>
                </div>
                <div title="A dirt or gravel single-track paths that are bicycle compatible.">
                <input type="checkbox" id="trails" name="trails" onChange={onCheckboxChange} checked={layerVisibility.trails}></input>
                <label for="trails">Natural Surface Trails</label>
                </div>
                <div>
                <input type="checkbox" id="bikeshop" name="bikeshop" onChange={onCheckboxChange} checked={layerVisibility.bikeshop}></input>
                <label for="bikeshop">Bike Shops</label>
                </div>
                <div>
                <input type="checkbox" id="parking" name="parking" onChange={onCheckboxChange} checked={layerVisibility.parking}></input>
                <label for="parking">Bike Parking</label>
                </div>
                <div>
                <input type="checkbox" id="toolstation" name="toolstation" onChange={onCheckboxChange} checked={layerVisibility.toolstation}></input>
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
                <input type="checkbox" id="intermediate" name="intermediate" value="intermediate"></input>
                <label for="intermediate">Intermediate</label>
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