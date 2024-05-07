/**
 * @module text-input.mocks
 * @description Hosts all mocks for unit testing of this component.
 * All exported object constants MUST be frozen to ensure immutability.
 * @version 1.0.0
 */

//  Correct value output
export const value: string = 'Test value123!@#';
export const replaceValue: string = 'Another test valueiii';
export const invalidValues: any[] = [
  {},
  { testProp: 'testValue' },
  [],
  [ 'testValue' ],
  Infinity,
  -Infinity,
  NaN,
  false,
  undefined,
  null
]

//  ID assignment
export const customId: string = 'testID';

//  Name assignment
export const customName: string = 'test-name';

//  ClassName assignment
export const defaultClassInput: string = 'irmaspfc__input';
export const customClassInput: string = 'test-class';
export const customClassOutputLabel: string = 'test-class__label';
export const customClassOutputInput: string = 'test-class__input';

//  Label assignment
export const customLabel: string = 'Test label:';

//  Autocapitalize
export const autocapitalizeInput = ` e.e. be 'nobody' he's i dr. we've 9a.m. 9AM ASAP`;
export const autocapitalizeValues = [
  { option: 0, output: autocapitalizeInput },
  { option: 1, output: ` E.E. BE 'NOBODY' HE'S I DR. WE'VE 9A.M. 9AM ASAP` },
  { option: 2, output: ` E.E. Be 'Nobody' He's I Dr. We've 9A.M. 9AM ASAP` },
  { option: 3, output: ` E.e. Be 'nobody' he's i dr. We've 9a.m. 9AM ASAP` },
  { option: 99, output: autocapitalizeInput }
];

//  Freeze constant objects
Object.freeze(invalidValues);
Object.freeze(autocapitalizeValues);

//  Correct value output (has to stay at the very end due to illegal chars)
//  Was generated as sorted list of unique characters from here:
//  https://github.com/minimaxir/big-list-of-naughty-strings
//  Point of using such string is to test it gets stored correctly.
export const utf16value: string =
  '	 !"#$%&\'()*+,-./0123' +
  '456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{' +
  '|}~ ¡¢£¥§¨©ª¬­®¯°±´µ¶·¸º¿ÁÂÅÆÇÍÎÏÒÓÔØÚÜßáåæçèéñ÷øąįıŒœƃƒƖơǝǫǹȺȾɐɔɯɹʇʖˆˇ˘˙˚˛˜˝˥̴̵̶̷̡̢̨̛̖̗̘̙̜̝̞̟̠̣̤̥̦̩̪̫̬̭̮̯̰̱̲̳̹̺̻̼͇͈͉͍͎́̕ͅ͏͓͔͕͖͙͚͘͜͟͢͝͞͠͡ΩπωЁЂЃЄЅІЇЈЉЊ' +
  'ЋЌЍЎЏАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдежзийклмнопрстуфхцчшщъыьэ' +
  'юя҉ְֱִֵֶַָֹּׁאבהוילםמץרשת؀؁؂؃؄؅،؜؟أإئابةتثجحخدذرزسشصطظعغفقكلمنهويًَُِّْ٠١٢٣٤٥٦٧٨٩پچژگ۝܏ॣజ' +
  'ఞా్ಥด็้ຈ༼༽ ᚂᚄᚅᚋᚏᚐᚑᚒᚓ᚛᚜᠎ᴉḀḍḙḥḶḽṮṰẹ         ​‌‍‎‏–—‘’‚“”„†‡•…  ' +
  '‪‫‬‭‮ ‰‹›‿⁄ ⁠⁡⁢⁣⁤⁦⁧⁨' +
  '⁩⁪⁫⁬⁭⁮⁯⁰⁴⁵₀₁₂€⃣™⅛⅜⅝⅞∀∂∆∏∑√∞∩∫≈≠≤≥⒜⒝⒞⒟⒠⒡⒢⒣⒤⒥⒦⒧⒨⒩⒪⒫⒬⒭⒮⒯⒰⒱⒲⒳⒴⒵─━┬┻╯╱╲□◊◕☃☻' +
  '♂✋✿❤　。あいかげさてなにへん゜ィツテノパポ・ーヽヾ㐀丂下中冗和學所會格漢田益研' +
  '社科究落行表製語逍部院鷗각고과구다똠란르를리맨바방사소시쑛어연온울원찦차타토펲하' +
  '학회ﬁﬂﷺ﷽️︵﻿）１２３＜＞ＢＴ｀ａｂｃｄｅｆｇｈｉｊｋｌｍｎｏｐｑｒｓｔｕｖｗ' +
  'ｘｙｚ｡･ｨﾉﾛﾟ￣￹￺￻￾';

