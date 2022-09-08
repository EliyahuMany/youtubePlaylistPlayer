import { render, screen } from "@testing-library/react";
import Sidebar from "../components/sidebar";
import "@testing-library/jest-dom";
import { list } from "./mock";

test("playlist is empty", async () => {
  render(<Sidebar />);
  expect(await screen.findByText("Playlist is empty")).toBeInTheDocument();
});

test("playlist contain all urls", async () => {
  render(<Sidebar list={list} />);
  expect(await screen.findByTestId(list[0].videoId)).toContainHTML(
    `<li data-testid="${list[0].videoId}"><span>${list[0].title.slice(0, 30)}...</span><span>${
      list[0].duration
    }</span><button>x</button></li>`
  );
  expect(await screen.findByTestId(list[1].videoId)).toContainHTML(
    `<li data-testid="${list[1].videoId}"><span>${list[1].title.slice(0, 30)}...</span><span>${
      list[1].duration
    }</span><button>x</button></li>`
  );
  expect(await screen.findByTestId(list[2].videoId)).toContainHTML(
    `<li data-testid="${list[2].videoId}"><span>${list[2].title.slice(0, 30)}...</span><span>${
      list[2].duration
    }</span><button>x</button></li>`
  );
});
