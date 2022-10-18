import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const API_KEY;

export default async function buildYoutubeObject(url) {
  if (url) {
    const regExp = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    const match = url.match(regExp);
    if (match && match[1]) {
      return await getVideoInfo(match[1]);
    }
  }
  return false;
}

async function getVideoInfo(videoId) {
  return axios
    .get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&part=contentDetails&id=${videoId}&key=${API_KEY}`)
    .then((res) => {
      const { snippet, contentDetails } = res?.data?.items[0];
      if (snippet && contentDetails) {
        return { id: uuidv4(), videoId, title: snippet.title, duration: timeFormat(contentDetails.duration) };
      }
    })
    .catch((e) => console.log(e));
}

function timeFormat(time) {
  var reptms = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/;
  let hours = 0,
    minutes = 0,
    seconds = 0;

  if (reptms.test(time)) {
    const matches = reptms.exec(time);
    if (matches[1]) hours = Number(matches[1]);
    if (matches[2]) minutes = Number(matches[2]);
    if (matches[3]) seconds = Number(matches[3]);
  }
  return `${hours ? `${digitsFormat(hours)}:` : ""}${digitsFormat(minutes)}:${digitsFormat(seconds)}`;
}

function digitsFormat(digit) {
  return digit.toString().length === 1 ? `0${digit}` : digit;
}
