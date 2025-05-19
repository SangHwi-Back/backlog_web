import programming from "../../../../public/programming.svg";
import books from "../../../../public/books.svg";

export enum MainMenu { programming, books }
export const MainMenus: MainMenu[] = [MainMenu.programming, MainMenu.books];

export function getMainMenuName(menu: MainMenu) {
  switch(menu) {
    case MainMenu.programming: return 'Programming';
    case MainMenu.books: return 'Books';
  }
}
export function getMainMenuIcon(menu: MainMenu): string {
  switch(menu) {
    case MainMenu.programming: return programming;
    case MainMenu.books: return books;
  }
}
export function getMainMenuURLPath(menu: MainMenu): string {
  switch(menu) {
    case MainMenu.programming: return '/?keyword=programming';
    case MainMenu.books: return '/?keyword=books';
  }
}
