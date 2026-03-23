const inputEl = document.getElementById("itemDetail");
const submitBtn = document.getElementById("submitBtn");
const itemList = document.getElementById("itemList");
const resetBtnEl=document.getElementById("resetBtn")

// select ALL lists
const allLists = document.querySelectorAll("ul");

let draggedItem = null;

// ================= ADD ITEM =================
submitBtn.addEventListener("click", () => {
    const value = inputEl.value.trim();

    if (!value) {
        alert("Please add an item");
        return;
    }

    const li = document.createElement("li");
    li.setAttribute("draggable", "true");

    // text node
    const textNode = document.createTextNode(value);
    li.appendChild(textNode);

    // delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    li.appendChild(delBtn);

    itemList.appendChild(li);
    inputEl.value = "";

    // ================= DELETE =================
    delBtn.addEventListener("click", () => {
        li.remove();
    });

    // ================= EDIT =================
    li.addEventListener("dblclick", (e) => {
        if (e.target.tagName === "BUTTON") return;

        const currentText = li.firstChild.nodeValue;

        const input = document.createElement("input");
        input.type = "text";
        input.value = currentText;

        li.replaceChild(input, li.firstChild);
        input.focus();

        // save on blur
        input.addEventListener("blur", saveEdit);

        // save on enter
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                saveEdit();
            }
        });

        function saveEdit() {
            const newText = input.value.trim() || currentText;
            const newTextNode = document.createTextNode(newText);
            li.replaceChild(newTextNode, input);
        }
    });

    // ================= DRAG =================
    li.addEventListener("dragstart", () => {
        draggedItem = li;
    });
});

// ================= DROP ZONES =================
allLists.forEach((list) => {

    list.addEventListener("dragover", (e) => {
        e.preventDefault();
        list.classList.add("drag-over"); // for CSS highlight
    });

    list.addEventListener("dragleave", () => {
        list.classList.remove("drag-over");
    });

    list.addEventListener("drop", () => {
        if (draggedItem) {
            list.appendChild(draggedItem);
            list.classList.remove("drag-over");
        }
    });

});
//=============== Reset Zone =========================

resetBtnEl.addEventListener("click",()=>{
    const confirmReset=confirm("Are you sure you want to reset ?")

    if(!confirmReset) return;
    document.querySelectorAll("ul").forEach(list=>{
        list.innerHTML=""
    })
})



//============== Complete button functionality=====================
document.getElementById("completeBtn").addEventListener("click", function() {
    
    const toBuyList = document.getElementById("itemList");
    if (toBuyList.children.length === 0) {
        alert("Nothing to complete!");
    } else {
        alert("🎉 Thank you! Your shopping is complete.");
       
    }
});

