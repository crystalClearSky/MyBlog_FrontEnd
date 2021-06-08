"use strict";
exports.__esModule = true;
var FilterService = /** @class */ (function () {
    function FilterService() {
        this.style = "color: green; text-decoration: none; cursor: pointer;";
        this.finalResult = "";
        this.links = [];
        ////////////////////////////////////////////////////////////////
        this.styleFill = "object-fit: contain;\n                width: 100%;\n                height: 100%;\n                max-height: 550px;\n                display: inline-block;\n                justify-content: center";
        this.finalHtml = "";
        this.isVideo = false;
    }
    // ----------------------------->>
    FilterService.prototype.FilterComment = function (message) {
        var _this = this;
        var currentWord = "";
        var final = "";
        var counter = 0;
        message = message.replace(/%([ :\w+]*)(https?:\/\/\w+[^\s]*):/g, "<a style=\"color: darkorange; text-decoration: none; cursor: pointer;\" target=\"_blank\" href=\"$2\">$1</a>");
        message.replace(/(<a style="color: darkorange; text-decoration: none; cursor: pointer;" target="_blank" href="([^"]+)">([^<]+)<\/a>)/g, function (w) {
            _this.links.push(w);
            return w;
        });
        message = message.replace(/(<a style="color: darkorange; text-decoration: none; cursor: pointer;" target="_blank" href="([^"]+)">([^<]+)<\/a>)/g, function (x) {
            return "&" + counter++;
        });
        message = message.replace(/%!([ \w+]*):([\d]*):?([\d.]*):?([\w]*):?([\w]+)*/g, "<span style=\"font-weight: $2; font-size: $3em; font-style: $4; text-decoration: $5;\">$1</span>");
        message = message.replace(/\*+(.*)?/g, "<li style=\"margin-top: 3px; margin-bottom: -20px;\" >$1</li>");
        //console.log("MESSAGE ---" + this.links[1]);
        var words = message.split(" ");
        for (var i = 0; i < words.length; i++) {
            if (!words[i].includes("gif") &&
                !words[i].includes("jpg") &&
                !words[i].includes("youtu")) {
                currentWord =
                    words[i].replace(/(?:(https?:\/\/[^\s]+))/i, '<a style="color: red; text-decoration: none; cursor: pointer;" target="_blank" href="$1">$1</a>') + " ";
                final += currentWord;
                words[i].replace(currentWord, "");
            }
            var imgLink = "";
            if (words[i].includes("gif") || words[i].includes("jpg")) {
                imgLink = words[i];
                currentWord =
                    words[i].replace(/(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.gif)(\?[^\s[",><]*)?/g, "<a style=\"text-decoration: none; cursor: pointer;\" href=\"" + imgLink + "\" target=\"_blank\" ><img src=\"$&\" width=\"100%\"></a>") + " ";
                final += currentWord;
            }
            if (words[i].includes("@")) {
                currentWord =
                    words[i].replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi, "<a style=\"" + this.style + "\" href=mailto:$1>$1</a>") + " ";
                final += currentWord.replace(words[i], "");
                final = final.replace(words[i], "");
            }
            if (words[i].startsWith("#")) {
                currentWord =
                    words[i].replace(/(#[-\w]+)/i, "<a class='play' style='color: #7CFC00; text-decoration: none; cursor: pointer;' >$1</a>") + " ";
                final += currentWord;
                //console.log("current word- " + currentWord.replace(words[i], ""));
                final = final.replace(words[i], "");
                words[i].replace(currentWord, "");
            }
            if (words[i].includes("youtu")) {
                currentWord =
                    words[i].replace(/(?:https?:\/\/)?(?:www\.)?(?:(?:(?:youtube.com\/watch\?[^?]*v=|youtu.be\/)([\w-]+))(?:[^\s?]+)?)/, "<style>\n            section {\n              position: relative;\n              padding-bottom: 56.25%;\n              height: 0;\n              overflow: hidden;\n              max-width: 100%;\n              height: auto;\n              border-radius: 10px;\n          }\n            section iframe,\n            section object,\n            section embed {\n              position: absolute;\n              top: 0;\n              left: 0;\n              width: 100%;\n              height: 100%;\n          }\n          </style>\n            <section>\n              <iframe src='http://www.youtube.com/embed/$1' frameborder='0' allowfullscreen='1'></iframe>\n            </section>") + " ";
                final += currentWord;
                words[i].replace(currentWord, "");
            }
            // if (
            //   (
            //     !words[i].startsWith("#") &&
            //     !words[i].includes("@") &&
            //     !words[i].includes("https")
            //   )
            // ) {
            // }
            console.log("end text - " + final);
        }
        this.finalResult = final.trim();
        for (var i = 0; i < this.links.length; i++) {
            var element = this.links[i];
            this.finalResult = this.finalResult.replace("&" + i, this.links[i]);
        }
        this.links = [];
        console.log(this.finalResult);
        var finalFinal = "<div style=\"line-height: 1.6\">" + this.finalResult + "</div>";
        return finalFinal;
    };
    FilterService.prototype.MediaFilter = function (medias) {
        console.log("In Media Filter Service.");
        var media = medias;
        var currentMedia = "";
        var imgLink = "";
        if (media.imageUrl.includes("gif") ||
            media.imageUrl.includes("jpg") ||
            media.imageUrl.includes("png") ||
            media.imageUrl.includes("jpeg")) {
            console.log("In IMAGE");
            media.catergory = 0;
            imgLink = media.imageUrl;
            currentMedia =
                media.imageUrl.replace(/(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.gif)(\?[^\s[",><]*)?/g, "<img style=\"" + this.styleFill + "\" src=\"$&\" width=\"100%\">") + " ";
            this.finalHtml = currentMedia;
        }
        if (media.imageUrl.includes("youtu") ||
            media.imageUrl.includes("vimeo") ||
            media.imageUrl.includes("bitchute")) {
            console.log("In VIDEO");
            this.isVideo = true;
            var videoCode = "";
            var frameSyntax = "";
            if (media.imageUrl.includes("youtu")) {
                media.catergory = 1;
                if (media.imageUrl.includes("img")) {
                    videoCode = media.imageUrl.replace("https://img.youtube.com/vi/", "");
                }
                else {
                    var code = media.imageUrl.match(/(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/);
                    videoCode = code ? code[1] : "";
                }
                frameSyntax = "http://www.youtube.com/embed/" + videoCode;
                console.log("YOUTUBE - " + frameSyntax);
            }
            if (media.imageUrl.includes("vimeo")) {
                media.catergory = 2;
                var code = media.imageUrl.replace("https://vimeo.com/", "");
                console.log("VIMEO - " + code);
                videoCode = code;
                console.log("VIMEO - " + videoCode);
                frameSyntax = "https://player.vimeo.com/video/" + videoCode;
            }
            if (media.imageUrl.includes("bitchute")) {
                var code = media.imageUrl.match(/(?:https?:\/\/)?(?:www\.)?(?:(?:(?:bitchute.com)([\w-]+))(?:[^\s?]+)?)/);
                videoCode = code ? code[0] : "";
                frameSyntax = "http://www.bitchute.com/embed/" + videoCode;
            }
            if (this.isVideo) {
                this.isVideo = false;
                this.finalHtml =
                    "<style>\n              section {\n                position: relative;\n                padding-bottom: 56.25%;\n                height: 0;\n                overflow: hidden;\n                max-width: 100%;\n                height: auto;\n                border-radius: 10px;\n              }\n              section iframe,\n              section object,\n              section embed {\n                position: absolute;\n                top: 0;\n                left: 0;\n                width: 100%;\n                height: 100%;\n              }\n            </style>\n            <section>\n              <iframe src='" + frameSyntax + "' height='480' frameborder='0' allowfullscreen='1' loading='lazy' ></iframe>\n            </section>" + " ";
            }
            //words[i].replace(currentWord, "");
        }
        this.finalMedia = {
            finalHtml: this.finalHtml,
            finalImage: media
        };
        return this.finalMedia;
    };
    return FilterService;
}());
exports["default"] = FilterService;
