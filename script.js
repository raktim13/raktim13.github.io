// --- 0. THEME MEMORY CHECK (Run immediately when page loads) ---
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
}

// 1. THEME TOGGLE LOGIC
function toggleTheme() {
    const body = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');
    
    // Toggle the theme
    if (body.getAttribute('data-theme') === 'light') {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark'); // Save choice
        if (themeIcon) themeIcon.innerText = 'light_mode'; 
    } else {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); // Save choice
        if (themeIcon) themeIcon.innerText = 'dark_mode'; 
    }
}

// 2. NAVIGATION MENU LOADER
document.addEventListener("DOMContentLoaded", function() {
    // Update the icon correctly based on the current theme
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.innerText = (localStorage.getItem('theme') === 'light') ? 'dark_mode' : 'light_mode';
    }

    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        fetch('menu.html')
            .then(response => response.text())
            .then(data => {
                navPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading menu:', error));
    }
});

// 3. Daenerys Easter Egg
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.getElementById('daenerys-drogon-easter-egg').style.display = 'flex';
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function closeDragon() {
    document.getElementById('daenerys-drogon-easter-egg').style.display = 'none';
}

function highlight(text){

    const query = document.getElementById("notes-search")?.value.trim();

    if(!query) return text;

    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");

    return text.replace(
    new RegExp(`(${escaped})`, "ig"),
    `
<span class="search-match">

    <span class="match-text">$1</span>

    <svg
        class="marching-border"
        preserveAspectRatio="none"
        viewBox="0 0 100 100">

        <rect
            x="2"
            y="2"
            width="96"
            height="96"
            rx="8"
            ry="8"/>

    </svg>

</span>
`
);
}

// 4. Notes repository 
function generateTree(data, searching = false, path = []) {
    const ul = document.createElement('ul');
    ul.className = "directory-list"; // Ensures your CSS styles apply

    for (const key in data) {
        const li = document.createElement('li');
        li.classList.add("tree-item");
        const value = data[key];
        const meta = value?._meta;

        if (typeof value === 'object' && value !== null) {
            const children = {...value};
            delete children._meta;
            li.innerHTML = `
                <details>
                    <summary class="folder-summary">
                        <span class="material-symbols-outlined folder-icon">
                            folder
                        </span>

                        <span class="folder-name">${highlight(key)}</span>
                    </summary>
                </details>`;

            const details = li.querySelector("details");
            const icon = li.querySelector(".folder-icon");
            if (searching) {
                details.open = true;
                icon.textContent = "folder_open";
                            }

                details.addEventListener("toggle", () => {

                    icon.classList.add("clicking");

                    setTimeout(() => {

                    icon.textContent = details.open ? "folder_open" : "folder";
                    icon.classList.remove("clicking");

                        const children = details.querySelectorAll(".folder-contents > .tree-item");

                        if(details.open){

                        children.forEach((child,index)=>{

                        child.classList.remove("show");

                    setTimeout(()=>{
                        child.classList.add("show");
                        },85+index*45);

                    });

                }else{

                    [...children].reverse().forEach((child,index)=>{

                    setTimeout(()=>{

                    child.classList.remove("show");

                    },index*45);

                    });

                }

                },45);

            });

            
            // Show the course card if there's metadata OR child files
            if (true) {
                let subtree = null;

                if (Object.keys(children).length > 0) {
                    subtree = generateTree(
                    children,
                    searching,
                    [...path, key]
                );
                subtree.classList.add("folder-contents");
                }

                if (meta) {

    const card = document.createElement("div");
    card.className = "course-meta";
    const breadcrumb = document.createElement("div");

breadcrumb.className = "breadcrumb";

breadcrumb.innerHTML =
    [...path, key]
        .map(p => `<span>${highlight(p)}</span>`)
        .join(" / ");

    card.innerHTML = `

<div class="course-header">

    <div class="course-title">
        ${highlight(key)}
    </div>

    <div class="course-meta-top">
        <span>👤 ${highlight(meta.instructor)}</span>

        <span>🌸 ${highlight(meta.term)}</span>

        <span>${
            meta.status==="completed"
            ? "🟢 Completed"
            : meta.status==="ongoing"
            ? "🟡 Ongoing"
            : "⚪ Planned"
        }</span>
    </div>

    <div class="course-meta-inst">
        🏛 ${highlight(meta.institution)}
    </div>

</div>

<div class="course-body">

<div class="course-books">

${meta.books.map((book,index)=>`

<div class="book-row">

${index===0
? `<span class="book-prefix">📚</span>`
: `<span class="book-prefix"></span>`}

<a href="${book.url}" target="_blank">

${highlight(book.title)} — ${highlight(book.author)}

</a>

</div>

`).join("")}

</div>

<div class="course-divider"></div>

</div>
`;

    if (subtree) {

        card.querySelector(".course-body").appendChild(subtree);

    } else {

        const empty = document.createElement("div");

        empty.className = "empty-folder";

        empty.innerHTML = `
            <div class="empty-symbol">∅</div>
            <div class="empty-text">
                The empty set is still a set.
            </div>
        `;

        card.querySelector(".course-body").appendChild(empty);

    }

    details.appendChild(breadcrumb);

details.appendChild(card);

}
else{

    if(subtree){

        details.appendChild(subtree);

    }
    else{

        const empty=document.createElement("div");

        empty.className="empty-folder";

        empty.innerHTML=`
            <div class="empty-symbol">∅</div>
            <div class="empty-text">
                The empty set is still a set.
            </div>
        `;

        details.appendChild(empty);

    }

}


}   // closes: if (Object.keys(children).length > 0)

ul.appendChild(li);

} else {
            li.innerHTML = `
                <a
                    href="${value}"
                    target="_blank"
                    class="file-link">
                        <span class="material-symbols-outlined file-icon">
                            picture_as_pdf
                        </span>

                        <span class="file-name">
                            ${highlight(key)}
                        </span>
                </a>`;
            ul.appendChild(li);
        }
    }
    return ul;
}

function filterTree(data,query){

    query=query.toLowerCase().trim();

    if(query==="") return data;

    const filtered={};

    for(const key in data){

        const value=data[key];

        if (typeof value !== "object" || value === null) {

    const fileName = key.toLowerCase();
    const filePath = String(value).toLowerCase();

    if (
        fileName.includes(query) ||
        filePath.includes(query)
    ) {
        filtered[key] = value;
    }

    continue;
}

        const meta=value._meta;

        let metadataMatch=false;

        if(meta){

            metadataMatch=
                (meta.instructor||"").toLowerCase().includes(query) ||
                (meta.institution||"").toLowerCase().includes(query) ||
                (meta.term||"").toLowerCase().includes(query) ||
                (meta.status||"").toLowerCase().includes(query) ||

                (meta.books||[]).some(book=>

                    (book.title||"").toLowerCase().includes(query) ||

                    (book.author||"").toLowerCase().includes(query)

                );
        }

        const children={...value};

        delete children._meta;

        const filteredChildren=filterTree(children,query);

        if(

            key.toLowerCase().includes(query) ||

            metadataMatch ||

            Object.keys(filteredChildren).length

        ){

            filtered[key]={

                ...(meta?{_meta:meta}:{}),

                ...filteredChildren

            };

        }

    }

    return filtered;

}

const easterEggs = {

    "meaning of life":
        "Let's not get ahead of ourselves. I've got five fucking years ahead of me to do philosophy.",

    "epsilon":
        "Please specify δ.",

    "axiom of choice":
        "Results may be nonconstructive.",

    "azor ahai":
        "Did you mean <strong>The Princess That Was Promised</strong> aka Daenerys Stormborn?",

    "dracarys":
        "<strong>Dracarys.</strong><br><em>Fire and Blood.</em>",

    "winter":
        "Winter is coming.",

    "valar morghulis":
        "Valar dohaeris.",

    "undefined":
        "Sounds like JavaScript.",

    "404":
        "The theorem you're looking for appears to be independent of ZFC.",

    "raktim":
        "Archive curator located.",

    "github":
        "Please don't look at the commit history.",

    "todo":
        "There are always more notes to write."

};
function renderTree(data){

    const notesContainer =
        document.getElementById("notes-tree-container");

    const search =
        document.getElementById("notes-search");

    const message =
        document.getElementById("search-message");

    const searching =
        search?.value.trim() !== "";

    notesContainer.innerHTML = "";

    notesContainer.appendChild(
        generateTree(data, searching)
    );

    message.innerHTML = "";

    if(searching){

        if(Object.keys(data).length===0){

            const q=search.value.trim().toLowerCase();

            message.innerHTML=
                easterEggs[q] ??
                "Nothing found.";

        }

    }

}
// Ensure the page is loaded before running
document.addEventListener("DOMContentLoaded",()=>{

    if(typeof myNotes==="undefined") return;

    renderTree(myNotes);

    const search=document.getElementById("notes-search");

search.addEventListener("input",()=>{

    renderTree(

        filterTree(

            myNotes,

            search.value

        )

    );

});

});











