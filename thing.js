// Somehow get a Scratch list from a function. This is an example, creating a global list called "my list".
let myList = vm.runtime.getTargetForStage().variables['%xBW-tF3*|{ZJXuU4RP^'];

// Somehow get a Scratch variable from a function. This is an example, getting the sprite's "my variable".
let myVar = vm.runtime.targets[0].variables['`jEk@4|i[#Fk?(8x)AV.-my variable'];

function onVariableChanged(myVar) {
    console.log("Variable", myVar.name, "updated to", myVar.value);
    
    // Prevent a network message loop by identifying where the message update came from.
    if (myVar.isExtUpdated) {
        myVar.isExtUpdated = false;
        return;
    }
    
    // TODO: Send the new variable state over the network
};

function makeNetworkedVariable(myVar) {
    // Use Object.defineProperty to define a property with custom setter
    Object.defineProperty(myVar, 'value', {
        enumerable: true,
        configurable: true,
        get: function() {
            return this._myProperty;
        },
        set: function(value) {
            this._myProperty = value;
            onVariableChanged(myVar);
        }
    });
    
    /*
        Create new property on the variable object so it can determine if the value was updated by the vm or the extension.
        If false, the Scratch VM was responsible for the most recent update. (send the value over the network!)
        If true, the CL5 extension updated the value (do not send the value over the network, this can cause a loop!)
    */
    myVar.isExtUpdated = false;
};

// ...

function onListUpdate(myList, method) {
    console.log("List updated to ", myList.value, "using method", method);
    
    // Prevent a network message loop by identifying where the message update came from.
    if (myList.isExtUpdated) {
        myList.isExtUpdated = false;
        return;
    }
    
    // TODO: Send the new list state over the network
};

function makeNetworkedList(myList) {
    // Given a variable target, modify the property so that we can listen to changes.
    // TODO: somehow detect entire list clearing or replace.
    ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse', 'delete'].forEach(function(method) {
        let original = Array.prototype[method];
        Object.defineProperty(myList.value, method, {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function(...args) {
                let result = original.apply(this, args);
                onListUpdate(myList, method);
                return result;
            }
        });
    });

    // Bless the list so that the extension can detect if its properties gets reset by the "Delete all of [list]" block.
    Object.defineProperty(myList.value, 'bless', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function() {
            return true;
        }
    });
    
    /*
        Create new property on the list object so it can determine if the value was updated by the vm or the extension.
        If false, the Scratch VM was responsible for the most recent update. (send the value over the network!)
        If true, the CL5 extension updated the value (do not send the value over the network, this can cause a loop!)
    */
    myList.isExtUpdated = false;
};

//...

function pushToNetworkedList(myList, newValue) {
    myList.isExtUpdated = true; // prevent network message loop
    myList.value.push(newValue);
    myList._monitorUpToDate = false; // Update list values for the stage
};

// Check if the value has been erased by checking if the bless property exists.
myList.value.hasOwnProperty('bless');

// Example on how to update from extension
myList.value.push(32);
myList._monitorUpToDate = false;
