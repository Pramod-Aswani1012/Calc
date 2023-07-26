document.addEventListener("keydown", function(event) {
    const key = event.key;

    // Check if the pressed key is a number, operator, or a special key (e.g., Backspace, Enter)
    const validInputs = /^[0-9%\/*\-+.=]|Backspace|Enter$/;

    if (validInputs.test(key)) {
        // If it's a valid key, handle it accordingly
        if (key === "Enter") {
            addtodisplay("=");
        } else if (key === "Backspace") {
            // Handle the "Backspace" key by removing one character from the end
            let display = document.getElementById("display");
            display.value = display.value.slice(0, -1);
        } else {
            // For other keys, pass them to the addtodisplay function
            addtodisplay(key);
        }
    }
});


function addtodisplay(myval) {
    let display = document.getElementById("display");

    // Check if the previous input was '='
    let isPreviousEqual = display.value === '=';

    if (myval === 'C') {
        display.value = "";
    } else if (myval === 'Back') {
        display.value = display.value.slice(0, -1);
    } else if (myval === '=') {
        try {
            if(display.value.length > 9)
            {
                document.getElementById("prevres").innerHTML=display.value.slice(0,5)+"...";
                
            }
            else{

                document.getElementById("prevres").innerHTML=display.value;
            }
            console.log(display.value);
            display.value = eval(display.value);
        } catch (error) {
            display.value = "Invalid Input";
        }
    } else {
        // If the previous input was '=', clear the display and show the new input without resizing
        if (isPreviousEqual) {
            display.value = myval;
        } else {
            // If not, update the font size to fit the content
            updateFontSize(display, myval);
        }
    }
}

// Helper function to update font size based on content length
function updateFontSize(element, value) {
    let fontSize = 32; // Initial font size
    const maxLength = 10; // Adjust this value based on your display's width

    // Calculate the content length without the ellipsis
    let contentLength = element.value.length + value.length;
    if (contentLength <= maxLength) {
        // If content length is within the limit, set the font size to the initial value
        element.style.fontSize = fontSize + "px";
    } else {
        // If content length exceeds the limit, reduce the font size until it fits
        while (contentLength > maxLength && fontSize > 10) {
            fontSize--;
            element.style.fontSize = fontSize + "px";
            contentLength = element.value.length + value.length;
        }
    }

    // Append the new value to the display
    element.value += value;
}
