type UpperCaseCharacters =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";

type WordSeparators = "-" | "_" | " ";

type SplitIncludingDelimiters<
  Source extends string,
  Delimiter extends string,
> = Source extends "" ? []
  : Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}` ? (
    Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}`
      ? UsedDelimiter extends Delimiter
        ? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}`
          ? [
            ...SplitIncludingDelimiters<FirstPart, Delimiter>,
            UsedDelimiter,
            ...SplitIncludingDelimiters<SecondPart, Delimiter>,
          ]
        : never
      : never
      : never
  )
  : [Source];
type StringPartToDelimiterCase<
  StringPart extends string,
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = StringPart extends UsedWordSeparators ? Delimiter
  : StringPart extends UsedUpperCaseCharacters
    ? `${Delimiter}${Lowercase<StringPart>}`
  : StringPart;
type StringArrayToDelimiterCase<
  Parts extends any[],
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string,
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
  ? `${StringPartToDelimiterCase<
    FirstPart,
    UsedWordSeparators,
    UsedUpperCaseCharacters,
    Delimiter
  >}${StringArrayToDelimiterCase<
    RemainingParts,
    UsedWordSeparators,
    UsedUpperCaseCharacters,
    Delimiter
  >}`
  : "";
type DelimiterCase<Value, Delimiter extends string> = Value extends string
  ? StringArrayToDelimiterCase<
    SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>,
    WordSeparators,
    UpperCaseCharacters,
    Delimiter
  >
  : Value;
type InnerCamelCaseStringArray<Parts extends any[], PreviousPart> =
  Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
    ? FirstPart extends undefined ? ""
    : FirstPart extends ""
      ? InnerCamelCaseStringArray<RemainingParts, PreviousPart>
    : `${PreviousPart extends "" ? FirstPart
      : Capitalize<FirstPart>}${InnerCamelCaseStringArray<
      RemainingParts,
      FirstPart
    >}`
    : "";
type CamelCaseStringArray<Parts extends string[]> = Parts extends
  [`${infer FirstPart}`, ...infer RemainingParts] ? Uncapitalize<
  `${FirstPart}${InnerCamelCaseStringArray<RemainingParts, FirstPart>}`
>
  : never;
type Split<S extends string, D extends string> = string extends S ? string[]
  : S extends "" ? []
  : S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>]
  : [S];

export type SnakeCase<Value> = DelimiterCase<Value, "_">;

export type CamelCase<K> = K extends string
  ? CamelCaseStringArray<Split<K, WordSeparators>>
  : K;

export type CamelCaseProps<T> = {
  [K in keyof T as CamelCase<K>]: CamelCaseProps<T[K]>;
};

export type SnakeCaseProps<T> = {
  [K in keyof T as SnakeCase<K>]: SnakeCaseProps<T[K]>;
};
