/**
 * @param {string} sourceHtml Строка с текстом для поиска входжений подстроки.
 * @param {string} plainTextSubstring Подстрока для поиска её вхождений в тексте.
 * @param {Function} highlighter Функция с определённым интерфейсом, для выделения найденных вхождений.
 * @return {string} Результат выделения подстроки в тексте.
 **/
function highlight(
    sourceHtml,
    plainTextSubstring,
    highlighter = (entry) => `<b>${entry}</b>`
) {
    let count = 0;
    let indexes = [];
    let nextSearch;

    function checkAndReplaceC(node) {
        let nodeVal = node.nodeValue;
        let parentNode = node.parentNode;
        let nextNode = node.nextElementSibling;
        let isFirst = true;
        for (; ;) {
            let request = plainTextSubstring;
            if (typeof nextSearch !== "undefined") {
                request = nextSearch;
                nextSearch = void 0;
            }

            let foundIndex = nodeVal.toLowerCase().indexOf(request.toLowerCase());

            if (foundIndex < 0) {
                if (
                    !indexes.length ||
                    indexes[0] - count >= nodeVal.length ||
                    (nextNode !== null &&
                        (nextNode.nodeName === "SCRIPT" || nextNode.nodeName === "STYLE"))
                ) {
                    if (
                        nextNode !== null &&
                        (nextNode.nodeName === "SCRIPT" || nextNode.nodeName === "STYLE")
                    ) {
                        indexes.shift();
                    }

                    if (isFirst) {
                        count += nodeVal.length;
                        break;
                    }
                    if (nodeVal) {
                        let textNode = document.createTextNode(nodeVal);
                        count += nodeVal.length;
                        parentNode.insertBefore(textNode, node);
                    }
                    parentNode.removeChild(node);
                } else {
                    if (indexes[0] - count > 0) {
                        let textNode = document.createTextNode(
                            nodeVal.substring(0, indexes[0] - count)
                        );
                        parentNode.insertBefore(textNode, node);
                    }
                    let addLength = nodeVal.length - (indexes[0] - count) + 1;
                    nextSearch = request.substring(
                        nodeVal.substring(indexes[0] - count).length
                    );

                    let newNode = new DOMParser().parseFromString(highlighter(nodeVal.substring(indexes[0] - count)), 'text/html');
                    for (let child of Array.prototype.slice.call(newNode.body.childNodes)) {
                        parentNode.insertBefore(child, node);
                    }

                    count += indexes[0] - count + request.length - addLength;
                    indexes.shift();
                    indexes.unshift(count);
                    parentNode.removeChild(node);
                }
                break;
            }
            isFirst = false;

            if (foundIndex > 0) {
                let textNode = document.createTextNode(nodeVal.substring(0, foundIndex));
                parentNode.insertBefore(textNode, node);
            }

            let newNode = new DOMParser().parseFromString(highlighter(
                nodeVal.substring(foundIndex, foundIndex + request.length)
            ), 'text/html');

            for (let child of Array.prototype.slice.call(newNode.body.childNodes)) {
                parentNode.insertBefore(child, node);
            }
            count += foundIndex + request.length;
            indexes.shift();
            nodeVal = nodeVal.substring(foundIndex + request.length);
        }
    }

    function loopDOMElementsC(elementDOM) {
        if (elementDOM === null) {
            return;
        }
        let children = Array.prototype.slice.call(elementDOM.childNodes);
        if (children.length) {
            for (let currentChild of children) {
                if (currentChild.nodeType === Node.TEXT_NODE) {
                    if (indexes[0] - count < currentChild.nodeValue.length) {
                        checkAndReplaceC(currentChild);
                    } else {
                        count += currentChild.nodeValue.length;
                    }
                } else if (currentChild.nodeType === Node.ELEMENT_NODE) {
                    if (
                        currentChild.nodeName === "SCRIPT" ||
                        currentChild.nodeName === "STYLE"
                    ) {
                        count += currentChild.textContent.length;
                    } else {
                        loopDOMElementsC(currentChild);
                    }
                }
            }
        }
    }

    function tryToFind(elementDOM) {
        let nodeText = elementDOM.textContent;
        let startIndex = 0;
        for (; ;) {
            let foundIndex = nodeText
                .toLowerCase()
                .indexOf(plainTextSubstring.toLowerCase(), startIndex);
            if (foundIndex !== -1) {
                indexes.push(foundIndex);
                startIndex = foundIndex + plainTextSubstring.length;
            } else {
                break;
            }
        }
        if (indexes.length) {
            loopDOMElementsC(elementDOM, indexes);
        }
    }

    let tempDOMElement = new DOMParser().parseFromString(sourceHtml, 'text/html');
    tryToFind(tempDOMElement.body);
    return tempDOMElement.body.innerHTML;
}

module.exports = highlight;