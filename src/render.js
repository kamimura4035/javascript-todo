// 文字列をもとに、domを作成する関数
const stringToElement = htmlString => {
  const template = document.createElement("template");
  template.innerHTML = htmlString;
  return template.content.firstElementChild;
};

// templateリテラル方式で書かれたhtml構造を、html elementに変更する関数
export const element = (strings, ...values) => {
  const htmlString = strings.reduce((elementString, string, i) => {
    const add = values[i - 1] + string;
    return elementString + add;
  });
  return stringToElement(htmlString);
};

// element`<ul>${hoge}</ul>` => HTMLParagraphElement
