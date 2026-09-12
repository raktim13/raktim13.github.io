// --- 0. THEME MEMORY CHECK (Run immediately when page loads) ---

const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {

    document.documentElement.setAttribute('data-theme', 'light');

}



function updateProfilePicture() {

    const profilePic = document.getElementById('profile-pic');



    if (!profilePic) return;



    if (document.documentElement.getAttribute('data-theme') === 'light') {

        profilePic.src = 'website_pic_2.jpeg';

    } else {

        profilePic.src = 'website_pic_1.jpeg';

    }

}



// 1. THEME TOGGLE LOGIC

function toggleTheme() {

    const body = document.documentElement;

    const themeIcon = document.getElementById('theme-icon');

    

    if (body.getAttribute('data-theme') === 'light') {

        body.removeAttribute('data-theme');

        localStorage.setItem('theme', 'dark');

        if (themeIcon) themeIcon.innerText = 'light_mode'; 

    } else {

        body.setAttribute('data-theme', 'light');

        localStorage.setItem('theme', 'light');

        if (themeIcon) themeIcon.innerText = 'dark_mode'; 

    }



    updateProfilePicture();

}





// =========================================================

// AUTUMN MAPLE LEAF OVERLAY

// =========================================================



function createFallLeaves() {



    // Don't create it twice

    if (document.querySelector(".fall-leaves")) return;



    const container = document.createElement("div");

    container.className = "fall-leaves";

    container.setAttribute("aria-hidden", "true");



    /*

       Maple leaf SVG.



       The SVG is deliberately inline so there is no external

       image, library, CDN, or asset required.

    */






    /*

       Each object controls one leaf.



       x       = horizontal starting position

       size    = leaf size

       color   = autumn color

       opacity = transparency

       speed   = falling speed

       delay   = when it enters the screen

       drift   = sideways movement

    */



    const leaves = [



        {

            x: "4vw",

            size: 82,

            color: "#d95f02",

            opacity: .72,

            speed: 18,

            delay: -4,

            drift: 80,

            rotation: 120

        },



        {

            x: "13vw",

            size: 42,

            color: "#b83b12",

            opacity: .68,

            speed: 14,

            delay: -9,

            drift: -55,

            rotation: -180

        },



        {

            x: "24vw",

            size: 105,

            color: "#f29f05",

            opacity: .62,

            speed: 22,

            delay: -15,

            drift: 100,

            rotation: 240

        },



        {

            x: "35vw",

            size: 48,

            color: "#d95f02",

            opacity: .58,

            speed: 16,

            delay: -6,

            drift: -80,

            rotation: -140

        },



        {

            x: "47vw",

            size: 70,

            color: "#e87511",

            opacity: .64,

            speed: 20,

            delay: -12,

            drift: 65,

            rotation: 200

        },



        {

            x: "59vw",

            size: 38,

            color: "#b83b12",

            opacity: .55,

            speed: 13,

            delay: -3,

            drift: -65,

            rotation: -220

        },



        {

            x: "68vw",

            size: 115,

            color: "#f29f05",

            opacity: .60,

            speed: 24,

            delay: -20,

            drift: 90,

            rotation: 280

        },



        {

            x: "80vw",

            size: 52,

            color: "#c94c12",

            opacity: .67,

            speed: 17,

            delay: -8,

            drift: -100,

            rotation: -170

        },



        {

            x: "91vw",

            size: 75,

            color: "#e87511",

            opacity: .58,

            speed: 21,

            delay: -17,

            drift: -70,

            rotation: 190

        },



        {

            x: "-2vw",

            size: 55,

            color: "#f29f05",

            opacity: .55,

            speed: 15,

            delay: -11,

            drift: 75,

            rotation: 230

        },



        {

            x: "18vw",

            size: 28,

            color: "#b83b12",

            opacity: .50,

            speed: 12,

            delay: -2,

            drift: 45,

            rotation: -150

        },



        {

            x: "42vw",

            size: 32,

            color: "#d95f02",

            opacity: .48,

            speed: 11,

            delay: -7,

            drift: -50,

            rotation: 170

        },



        {

            x: "73vw",

            size: 30,

            color: "#b83b12",

            opacity: .48,

            speed: 14,

            delay: -14,

            drift: 55,

            rotation: -190

        },



        {

            x: "96vw",

            size: 45,

            color: "#f29f05",

            opacity: .52,

            speed: 18,

            delay: -5,

            drift: -60,

            rotation: 210

        }



    ];





    leaves.forEach(leaf => {



        const element = document.createElement("div");



        element.className = "fall-leaf";



        element.innerHTML = `
    <img
        class="fall-leaf-image"
        src="maple-leaves.png"
        alt=""
        draggable="false"
    >
`;



       element.style.setProperty(
    "--leaf-size",
    `${Math.max(20, Math.round(leaf.size * 0.76))}px`
);

element.style.setProperty(
    "--leaf-opacity",
    Math.min(leaf.opacity, 0.49)
);

element.style.setProperty("--fall-duration", `${leaf.speed}s`);
element.style.setProperty("--fall-delay", `${leaf.delay}s`);
element.style.setProperty("--start-x", leaf.x);

/* Windy, but still mostly downward */
element.style.setProperty("--drift-1", `${leaf.drift * 0.40}px`);
element.style.setProperty("--drift-2", `${leaf.drift * -0.30}px`);
element.style.setProperty("--drift-3", `${leaf.drift * 0.55}px`);
element.style.setProperty("--drift-4", `${leaf.drift * 0.18}px`);

/* Gentle rocking plus a slow overall turn */
element.style.setProperty("--rotation-start", `${leaf.rotation - 18}deg`);
element.style.setProperty("--rotation-mid-1", `${leaf.rotation + 25}deg`);
element.style.setProperty("--rotation-mid-2", `${leaf.rotation - 12}deg`);
element.style.setProperty("--rotation-mid-3", `${leaf.rotation + 40}deg`);
element.style.setProperty("--rotation-end", `${leaf.rotation + 70}deg`);





        container.appendChild(element);

    });



    document.body.prepend(container);

}





// 2. NAVIGATION MENU LOADER

document.addEventListener("DOMContentLoaded", function() {

        createFallLeaves();

    // Update the icon correctly based on the current theme

    const themeIcon = document.getElementById('theme-icon');

    if (themeIcon) {

        themeIcon.innerText = (localStorage.getItem('theme') === 'light') ? 'dark_mode' : 'light_mode';

    }



    updateProfilePicture();



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



                        <span

    class="folder-name"



    data-prof="${meta?.instructor || ""}"



    data-term="${meta?.term || ""}"



    data-inst="${meta?.institution || ""}"



>



${highlight(key)}



</span>

                    </summary>

                </details>`;



            const details = li.querySelector("details");

            let card = null;

            if(meta){



    const preview=document.createElement("div");



    preview.className="folder-preview";



    preview.innerHTML = `



<div><strong>Term:</strong> ${meta.term}</div>



<div><strong>Institution:</strong> ${meta.institution}</div>



<div><strong>Instructor:</strong> ${meta.instructor}</div>



`;



    details.after(preview);



}

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



setTimeout(() => {



    if (details.open && card) {

        animateCourseCard(card);

    }



},180);

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



    card = document.createElement("div");

    card.className = "course-meta";

    const breadcrumb = document.createElement("div");



breadcrumb.className = "breadcrumb";



breadcrumb.innerHTML =

    [...path, key]

        .map(p => `<span>${highlight(p)}</span>`)

        .join(" / ");



    card.innerHTML = `



<div class="course-header">



    <div

    class="course-title typewriter"

    data-text="${key}">

</div>



    <div class="course-meta-top">



    <span class="typewriter"

          data-text="👤 ${meta.instructor}">

    </span>



    <span class="typewriter"

         data-text="${meta.term.toLowerCase().includes('autumn') ? '🍂' : '🌸'} ${meta.term}">

    </span>



    <span class="typewriter"

          data-text="${

                meta.status==="completed"

                ? "🟢 Completed"

                : meta.status==="ongoing"

                ? "🟡 Ongoing"

                : "⚪ Planned"

          }">

    </span>



</div>



<div

    class="course-meta-inst typewriter"

    data-text="🏛 ${meta.institution}">

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





   // closes: if (Object.keys(children).length > 0)



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



    notesContainer.classList.add("tree-fading");



setTimeout(()=>{



    notesContainer.innerHTML="";



    notesContainer.appendChild(

        generateTree(data,searching)

    );





    requestAnimationFrame(()=>{



        notesContainer.classList.remove("tree-fading");



    });



},120);



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







function sleep(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}



async function typeElement(element) {



    const text = element.dataset.text;



    element.textContent = "";



    element.classList.add("typing");



    for (const letter of text) {



        element.textContent += letter;



        await sleep(25 + Math.random()*20);



    }



    await sleep(250);



element.classList.remove("typing");

}



async function animateCourseCard(card) {



    if(card.dataset.typed){

        return;

    }



    card.dataset.typed = "true";



    const items = card.querySelectorAll(".typewriter");



    for(const item of items){



        await typeElement(item);



    }



} 

