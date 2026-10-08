document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById("offtopic-container");

    if (!container || typeof offTopic === "undefined") {
        return;
    }

    const categories = [
        {
            key: "movies",
            title: "Movies"
        },
        {
            key: "series",
            title: "Series"
        },
        {
            key: "music",
            title: "Music"
        }
    ];

    categories.forEach(category => {

    const items = offTopic[category.key] || [];

    const section = document.createElement("section");
    section.className = `offtopic-section offtopic-${category.key}`;

    const folder = document.createElement("details");
    folder.className = "offtopic-folder";

    const summary = document.createElement("summary");

    const icon = document.createElement("span");
    icon.className = "material-symbols-outlined offtopic-folder-icon";

    if (category.key === "movies") {
        icon.textContent = "movie";
    } else if (category.key === "series") {
        icon.textContent = "tv";
    } else if (category.key === "music") {
        icon.textContent = "music_note";
    }

    const title = document.createElement("span");
    title.textContent = category.title;

    summary.appendChild(icon);
    summary.appendChild(title);

    const list = document.createElement("div");
    list.className = "offtopic-list";

    items.forEach(item => {
        list.appendChild(createOfftopicItem(item, category.key));
    });

    folder.appendChild(summary);
    folder.appendChild(list);

    section.appendChild(folder);
    container.appendChild(section);
    });
});


function createOfftopicItem(item, category) {
    const wrapper = document.createElement("div");
    wrapper.className = "offtopic-item";

    const button = document.createElement("button");
    button.className = "offtopic-item-title";
    button.type = "button";
    button.textContent = item.title;

    const card = document.createElement("article");
    card.className = `offtopic-card offtopic-card-${category}`;
    card.hidden = true;


    button.addEventListener("click", function () {
        const currentlyOpen = !card.hidden;

        document.querySelectorAll(".offtopic-card").forEach(otherCard => {
            otherCard.hidden = true;
        });

        document.querySelectorAll(".offtopic-item-title").forEach(otherButton => {
            otherButton.classList.remove("open");
        });

        if (!currentlyOpen) {
            card.hidden = false;
            button.classList.add("open");
        }
    });


    // Image panel
    const imagePanel = document.createElement("div");
    imagePanel.className = "offtopic-image-panel";

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = `${item.title} cover`;
    image.loading = "lazy";

    imagePanel.appendChild(image);


    // Information panel
    const info = document.createElement("div");
    info.className = "offtopic-info-panel";

    const title = document.createElement("h3");
    title.textContent = item.title;
    info.appendChild(title);

    if (item.year) {
        const year = document.createElement("div");
        year.className = "offtopic-year";
        year.textContent = item.year;
        info.appendChild(year);
    }


    const metadata = document.createElement("div");
    metadata.className = "offtopic-metadata";

    if (item.releaseDate) {
        metadata.appendChild(
            createMetadataRow("Release date", item.releaseDate)
        );
    }

    if (item.director) {
        metadata.appendChild(
            createMetadataRow("Director", item.director)
        );
    }

    if (item.artist) {
        metadata.appendChild(
            createMetadataRow("Artist", item.artist)
        );
    }

    if (item.rating !== null && item.rating !== undefined) {
        metadata.appendChild(
            createMetadataRow("Rating", `${item.rating}/5`)
        );
    }

    info.appendChild(metadata);


    // External links
    if (item.links) {
        const links = document.createElement("div");
        links.className = "offtopic-links";

        if (item.links.imdb) {
            links.appendChild(
                createExternalLink("IMDb", item.links.imdb)
            );
        }

        if (item.links.appleMusic) {
            links.appendChild(
                createExternalLink("Apple Music", item.links.appleMusic)
            );
        }

        info.appendChild(links);
    }


    card.appendChild(imagePanel);
    card.appendChild(info);

    wrapper.appendChild(button);
    wrapper.appendChild(card);

    return wrapper;
}


function createMetadataRow(label, value) {
    const row = document.createElement("div");
    row.className = "offtopic-metadata-row";

    const labelElement = document.createElement("span");
    labelElement.className = "offtopic-metadata-label";
    labelElement.textContent = `${label}:`;

    const valueElement = document.createElement("span");
    valueElement.className = "offtopic-metadata-value";
    valueElement.textContent = value;

    row.appendChild(labelElement);
    row.appendChild(valueElement);

    return row;
}


function createExternalLink(label, url) {
    const link = document.createElement("a");

    link.href = url;
    link.textContent = label;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    return link;
}
