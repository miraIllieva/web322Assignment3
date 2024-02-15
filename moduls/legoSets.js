/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: ________Dragomira Veleva______________ Student ID: _____184787216_________ Date: ____01-Feb-2024__________
*
********************************************************************************/
const setData = require("../data/setData.json");
const themeData = require("../data/themeData.json");
let sets = [];


function initialize() {
    return new Promise((resolve, reject) => {
        try {
            setData.forEach(set => {
                let theme = themeData.find(theme => theme.id === set.theme_id);
                sets.push({ ...set, theme: theme ? theme.name : "Unknown" });
            });
            resolve();
        } catch (error) {
            reject("Initialization failed: " + error);
        }
    });
}


function getAllSets() {
    return new Promise((resolve) => {
        resolve(sets);
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        const set = sets.find(set => set.set_num === setNum);
        if(set) {
            resolve(set);
        } else {
            reject("Set not found");
        }
    });
}


function getSetsByTheme(theme) {
    return new Promise((resolve) => {
        const filteredSets = sets.filter(set => set.theme.toLowerCase().includes(theme.toLowerCase()));
        resolve(filteredSets);
    });
}


module.exports = { initialize, getAllSets, getSetByNum, getSetsByTheme };


initialize().then(() => {
    console.log("Initialization complete.");
    getAllSets().then(sets => {
        console.log("All Sets:", sets);
    });

    getSetByNum("001-1").then(set => {
        console.log("Set by Number:", set);
    }).catch(err => {
        console.error(err);
    });

    getSetsByTheme("technic").then(sets => {
        console.log("Sets by Theme:", sets);
    });
}).catch(err => {
    console.error(err);
});
