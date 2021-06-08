import { IContent, Image } from "@/types/Content";
import IMediaContent from "@/types/MediaContent";

export default class FilterService {
  style = "color: green; text-decoration: none; cursor: pointer;";
  finalResult = "";
  links = [];
  // ----------------------------->>
  public FilterComment(message: string): string {
    let currentWord = "";
    let final = "";
    let counter = 0;
    message = message.replace(
      /%([ :\w+]*)(https?:\/\/\w+[^\s]*):/g,
      `<a style="color: darkorange; text-decoration: none; cursor: pointer;" target="_blank" href="$2">$1</a>`
    );
    message.replace(
      /(<a style="color: darkorange; text-decoration: none; cursor: pointer;" target="_blank" href="([^"]+)">([^<]+)<\/a>)/g,
      (w) => {
        this.links.push(w);
        return w;
      }
    );
    message = message.replace(
      /(<a style="color: darkorange; text-decoration: none; cursor: pointer;" target="_blank" href="([^"]+)">([^<]+)<\/a>)/g,
      (x) => {
        return "&" + counter++;
      }
    );
    message = message.replace(
      /%!([ \w+]*):([\d]*):?([\d.]*):?([\w]*):?([\w]+)*/g,
      `<span style="font-weight: $2; font-size: $3em; font-style: $4; text-decoration: $5;">$1</span>`
    );

    message = message.replace(/\*+(.*)?/g, `<li style="margin-top: 3px; margin-bottom: -20px;" >$1</li>`);
 
    //console.log("MESSAGE ---" + this.links[1]);
    const words = message.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (
        !words[i].includes("gif") &&
        !words[i].includes("jpg") &&
        !words[i].includes("youtu")
      ) {
        currentWord =
          words[i].replace(
            /(?:(https?:\/\/[^\s]+))/i,
            '<a style="color: red; text-decoration: none; cursor: pointer;" target="_blank" href="$1">$1</a>'
          ) + " ";
        final += currentWord;
        words[i].replace(currentWord, "");
      }
      let imgLink = "";
      if (words[i].includes("gif") || words[i].includes("jpg")) {
        imgLink = words[i];
        currentWord =
          words[i].replace(
            /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.gif)(\?[^\s[",><]*)?/g,
            `<a style="text-decoration: none; cursor: pointer;" href="${imgLink}" target="_blank" ><img src="$&" width="100%"></a>`
          ) + " ";
        final += currentWord;
      }

      if (words[i].includes("@")) {
        currentWord =
          words[i].replace(
            /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi,
            `<a style="${this.style}" href=mailto:$1>$1</a>`
          ) + " ";

        final += currentWord.replace(words[i], "");
        final = final.replace(words[i], "");
      }

      if (words[i].startsWith("#")) {
        currentWord =
          words[i].replace(
            /(#[-\w]+)/i,
            "<a class='play' style='color: #7CFC00; text-decoration: none; cursor: pointer;' >$1</a>"
          ) + " ";
        final += currentWord;
        //console.log("current word- " + currentWord.replace(words[i], ""));
        final = final.replace(words[i], "");

        words[i].replace(currentWord, "");
      }

      if (words[i].includes("youtu")) {
        currentWord =
          words[i].replace(
            /(?:https?:\/\/)?(?:www\.)?(?:(?:(?:youtube.com\/watch\?[^?]*v=|youtu.be\/)([\w-]+))(?:[^\s?]+)?)/,

            `<style>
            section {
              position: relative;
              padding-bottom: 56.25%;
              height: 0;
              overflow: hidden;
              max-width: 100%;
              height: auto;
              border-radius: 10px;
          }
            section iframe,
            section object,
            section embed {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
          }
          </style>
            <section>
              <iframe src='http://www.youtube.com/embed/$1' frameborder='0' allowfullscreen='1'></iframe>
            </section>`
          ) + " ";
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

    for (let i = 0; i < this.links.length; i++) {
      const element = this.links[i];
      this.finalResult = this.finalResult.replace(`&${i}`, this.links[i] )
    }
    this.links = [];
    console.log(this.finalResult);
    const finalFinal = `<div style="line-height: 1.6">${this.finalResult}</div>`
    return finalFinal;
  }

  ////////////////////////////////////////////////////////////////

  styleFill = `object-fit: contain;
                width: 100%;
                height: 100%;
                max-height: 550px;
                display: inline-block;
                justify-content: center`;

  finalHtml = "";
  isVideo = false;
  finalMedia!: IMediaContent;
  public MediaFilter(medias: Image): IMediaContent {
    console.log("In Media Filter Service.");
    const media = medias;
    let currentMedia = "";
    let imgLink = "";

    if (
      media.imageUrl.includes("gif") ||
      media.imageUrl.includes("jpg") ||
      media.imageUrl.includes("png") ||
      media.imageUrl.includes("jpeg")
    ) {
      console.log("In IMAGE");
      media.catergory = 0;
      imgLink = media.imageUrl;
      currentMedia =
        media.imageUrl.replace(
          /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.gif)(\?[^\s[",><]*)?/g,
          `<img style="${this.styleFill}" src="$&" width="100%">`
        ) + " ";
      this.finalHtml = currentMedia;
    }

    if (
      media.imageUrl.includes("youtu") ||
      media.imageUrl.includes("vimeo") ||
      media.imageUrl.includes("bitchute")
    ) {
      console.log("In VIDEO");
      this.isVideo = true;
      let videoCode = "";
      let frameSyntax = "";
      if (media.imageUrl.includes("youtu")) {
        media.catergory = 1;
        if (media.imageUrl.includes("img")) {
          videoCode = media.imageUrl.replace("https://img.youtube.com/vi/", "");
        } else {
          const code = media.imageUrl.match(
            /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/ ]{11})/
          );
          videoCode = code ? code[1] : "";
        }
        frameSyntax = `http://www.youtube.com/embed/${videoCode}`;
        console.log("YOUTUBE - " + frameSyntax);
      }
      if (media.imageUrl.includes("vimeo")) {
        media.catergory = 2;
        const code = media.imageUrl.replace("https://vimeo.com/", "");
        console.log("VIMEO - " + code);
        videoCode = code;
        console.log("VIMEO - " + videoCode);
        frameSyntax = `https://player.vimeo.com/video/${videoCode}`;
      }
      if (media.imageUrl.includes("bitchute")) {
        const code = media.imageUrl.match(
          /(?:https?:\/\/)?(?:www\.)?(?:(?:(?:bitchute.com)([\w-]+))(?:[^\s?]+)?)/
        );
        videoCode = code ? code[0] : "";
        frameSyntax = `http://www.bitchute.com/embed/${videoCode}`;
      }
      if (this.isVideo) {
        this.isVideo = false;
        this.finalHtml =
          `<style>
              section {
                position: relative;
                padding-bottom: 56.25%;
                height: 0;
                overflow: hidden;
                max-width: 100%;
                height: auto;
                border-radius: 10px;
              }
              section iframe,
              section object,
              section embed {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
              }
            </style>
            <section>
              <iframe src='${frameSyntax}' height='480' frameborder='0' allowfullscreen='1' loading='lazy' ></iframe>
            </section>` + " ";
      }
      //words[i].replace(currentWord, "");
    }

    this.finalMedia = {
      finalHtml: this.finalHtml,
      finalImage: media,
    };
    return this.finalMedia;
  }
}
