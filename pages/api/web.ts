import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import {
  countOccurence,
  filterMatchingElements,
  flatten2DArray,
  getUrlEnding,
  removeEmptyElements,
  removeParameters
} from '../../utils';

const getProperty = async (item: puppeteer.ElementHandle<Element>, property: string) => {
  try {
    return await (await item.getProperty(property)).jsonValue();
  } catch (error) {
    console.log('Error getting property: ', error);
    return '';
  }
};

const getData = async (
  url: string,
  xPath: string,
  property: string,
  browser: puppeteer.Browser
) => {
  try {
    const page = await browser.newPage();
    await page.goto(url);
    const result = await page.$x(xPath);
    const scripts: string[] = (await Promise.all(
      result.map((element) => getProperty(element, property))
    )) as string[];
    console.log('scripts', scripts);
    return scripts;
  } catch (error) {
    console.log('Error getting data: ', error);
    return [''];
  }
};

const getWebPage = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req?.query?.search) return res.status(200).json({ error: true, result: 'no search argument' });

  const searchArgument = req?.query?.search.toString();
  const googleXPath = '//*[@class="g"]/*[@class="tF2Cxc"]/*[@class="yuRUbf"]/a';
  const scriptXPath = '//script';
  const googleUrl = `https://www.google.com/search?q=${searchArgument}&oq=${searchArgument}`;
  const browser = await puppeteer.launch();

  const googleURLs = await getData(googleUrl, googleXPath, 'href', browser);
  const result2d = await Promise.all(
    googleURLs.map((element) => getData(element, scriptXPath, 'src', browser))
  );
  console.log('result2d', result2d);
  let result = flatten2DArray(result2d);
  result = removeEmptyElements(result);
  result = getUrlEnding(result);
  result = removeParameters(result);
  result = filterMatchingElements(result, '.js');
  const topLibraries = countOccurence(result).slice(0, 5);

  res.status(200).json({ result: topLibraries });
};
export default getWebPage;
