function render_editor() {
    window.quill = new Quill('#editor', {
        modules: {
            toolbar: [
                [
                    {
                        header: [
                            1,
                            2,
                            3,
                            4,
                            5,
                            false
                        ]
                    }
                ],
                [
                    'bold',
                    'italic',
                    'underline',
                    'strike'
                ],
                [
                    'link',
                    'blockquote'
                ],
                [
                    {
                        'script': 'sub'
                    },
                    {
                        'script': 'super'
                    }
                ],
                [
                    {
                        'align': [
                            '',
                            'center',
                            'right'
                        ]
                    }
                ],
                [
                    {
                        'color': []
                    }
                ],
                [
                    'clean'
                ]
            ]
        },
        placeholder: 'Compose an epic... or paste in one!',
        theme: 'snow'
    });
}
function convertText(quillContents) {
    let ops = quillContents.ops;
    let convertedText = document.getElementById("convertedText");
    convertedText.innerHTML = "" //clear placeholder.
    ;
    // blocks in quill are handled by a single newline insert with block properties.
    // so we need to store a block before writing it since formatting might be at the end
    let currentBlock = "";
    ops.forEach((element, idx)=>{
        let attr = element?.attributes;
        let text = element.insert;
        currentBlock += convertQuillOp(text, attr);
        // if this is a newline only with attributes, it's likely a block end
        if (text == '\n' || idx == ops.length - 1) {
            // per https://github.com/quilljs/quill/issues/3035
            // block formatting applies from the block operation back to the last \n, so only format the current one
            // cannot use destructuring assignemtn due to parcel error.
            let res = getLastLine(currentBlock);
            let prev = res[0];
            let last = res[1];
            // place anything up to the last block since we don't want to format it.
            convertedText.innerText += prev.length > 0 ? prev + "\n" : "" // auto add a line break, unless there's no content in prev
            ;
            currentBlock = last + "\n" //ensure there's a trailing newline, in case this is a normal paragraph
            ;
            // handle block level items before placing. Note that we dont' add justify alignment tags
            // since it's not understood by FA.
            if (attr?.align && attr.align != 'justify') currentBlock = `[${attr.align}]${currentBlock.trim()}[/${attr.align}]\n`;
            if (attr?.header) currentBlock = `[h${attr.header}]${currentBlock.trim()}[/h${attr.header}]\n`;
            if (attr?.blockquote) currentBlock = `[quote]${currentBlock.trim()}[/quote]\n`;
            // place the block
            convertedText.innerText += currentBlock;
            currentBlock = '';
        }
    });
    // most people will likely want to normalize all linebreaks into paragraph breaks
    const newlines = /(<br>)+/g;
    convertedText.innerHTML = convertedText.innerHTML.replaceAll(newlines, '\n<br /><br />');
}
function getLastLine(text) {
    let idx = text.trimEnd().lastIndexOf("\n");
    return [
        text.substring(0, idx),
        text.substring(idx).trim()
    ];
}
function convertQuillOp(text, attr) {
    if (text == '') return '';
    if (attr) {
        if (attr.italic) text = "[i]" + text + "[/i]";
        if (attr.bold) text = "[b]" + text + "[/b]";
        if (attr.underline) text = "[u]" + text + "[/u]";
        if (attr.link) text = `[url=${attr.link}]${text}[/url]`;
        if (attr.script) {
            if (attr.script == 'super') text = "[sup]" + text + "[/sup]";
            else text = "[sub]" + text + "[/sub]";
        }
        if (attr.color && attr.color != "#000000" && attr.color != "black") text = `[color=${attr.color}]${text}[/color]`;
    }
    return text;
}
document.getElementById("convertButton").onclick = (e)=>{
    e.preventDefault();
    console.log("converting text...");
    convertText(quill.getContents());
};
document.getElementById("copyButton").onclick = (e)=>{
    e.preventDefault();
    console.log("adding text to clipboard");
    let textToCopy = document.getElementById("convertedText").innerText;
    navigator.clipboard.writeText(textToCopy);
};
document.getElementById("downloadButton").onclick = (e)=>{
    e.preventDefault();
    console.log("downloading converted text...");
    let textToDownload = document.getElementById("convertedText").innerText;
    let elem = document.createElement("a");
    elem.setAttribute("href", 'data:text/plain;charset=utf-8,' + encodeURIComponent(textToDownload));
    elem.setAttribute("download", "story.txt");
    elem.style.display = 'none';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
};
render_editor();

//# sourceMappingURL=index.563467c1.js.map
