// deno-lint-ignore-file ban-types no-explicit-any

export type UpperCaseCharacters =
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

export type WordSeparators = "-" | "_" | " ";

export type StringDigit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

export type Split<S extends string, D extends string> = string extends S
  ? string[]
  : S extends ""
  ? []
  : S extends `${infer T}${D}${infer U}`
  ? [T, ...Split<U, D>]
  : [S];

export type SplitIncludingDelimiters<Source extends string, Delimiter extends string> = Source extends ""
  ? []
  : Source extends `${infer FirstPart}${Delimiter}${infer SecondPart}`
  ? Source extends `${FirstPart}${infer UsedDelimiter}${SecondPart}`
    ? UsedDelimiter extends Delimiter
      ? Source extends `${infer FirstPart}${UsedDelimiter}${infer SecondPart}`
        ? [
            ...SplitIncludingDelimiters<FirstPart, Delimiter>,
            UsedDelimiter,
            ...SplitIncludingDelimiters<SecondPart, Delimiter>
          ]
        : never
      : never
    : never
  : [Source];

type InnerCamelCaseStringArray<Parts extends any[], PreviousPart> = Parts extends [
  `${infer FirstPart}`,
  ...infer RemainingParts
]
  ? FirstPart extends undefined
    ? ""
    : FirstPart extends ""
    ? InnerCamelCaseStringArray<RemainingParts, PreviousPart>
    : `${PreviousPart extends "" ? FirstPart : Capitalize<FirstPart>}${InnerCamelCaseStringArray<
        RemainingParts,
        FirstPart
      >}`
  : "";

type CamelCaseStringArray<Parts extends string[]> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
  ? Uncapitalize<`${FirstPart}${InnerCamelCaseStringArray<RemainingParts, FirstPart>}`>
  : never;

type StringPartToDelimiterCase<
  StringPart extends string,
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string
> = StringPart extends UsedWordSeparators
  ? Delimiter
  : StringPart extends UsedUpperCaseCharacters
  ? `${Delimiter}${Lowercase<StringPart>}`
  : StringPart;

type StringArrayToDelimiterCase<
  Parts extends any[],
  UsedWordSeparators extends string,
  UsedUpperCaseCharacters extends string,
  Delimiter extends string
> = Parts extends [`${infer FirstPart}`, ...infer RemainingParts]
  ? `${StringPartToDelimiterCase<
      FirstPart,
      UsedWordSeparators,
      UsedUpperCaseCharacters,
      Delimiter
    >}${StringArrayToDelimiterCase<RemainingParts, UsedWordSeparators, UsedUpperCaseCharacters, Delimiter>}`
  : "";

export type DelimiterCase<Value, Delimiter extends string> = Value extends string
  ? StringArrayToDelimiterCase<
      SplitIncludingDelimiters<Value, WordSeparators | UpperCaseCharacters>,
      WordSeparators,
      UpperCaseCharacters,
      Delimiter
    >
  : Value;

export type DelimiterCasedProperties<Value, Delimiter extends string> = Value extends Function
  ? Value
  : Value extends Array<infer U>
  ? Value
  : { [K in keyof Value as DelimiterCase<K, Delimiter>]: Value[K] };

export type DelimiterCasedPropertiesDeep<Value, Delimiter extends string> = Value extends Function
  ? Value
  : Value extends Array<infer U>
  ? Array<DelimiterCasedPropertiesDeep<U, Delimiter>>
  : Value extends Set<infer U>
  ? Set<DelimiterCasedPropertiesDeep<U, Delimiter>>
  : {
      [K in keyof Value as DelimiterCase<K, Delimiter>]: DelimiterCasedPropertiesDeep<Value[K], Delimiter>;
    };

export type SnakeCase<Value> = DelimiterCase<Value, "_">;

export type CamelCase<K> = K extends string ? CamelCaseStringArray<Split<K, WordSeparators>> : K;

export type SnakeCasedProperties<Value> = DelimiterCasedProperties<Value, "_">;

export type CamelCasedProperties<Value> = Value extends Function
  ? Value
  : Value extends Array<infer U>
  ? Value
  : {
      [K in keyof Value as CamelCase<K>]: Value[K];
    };

export type SnakeCasedPropertiesDeep<Value> = DelimiterCasedPropertiesDeep<Value, "_">;

export type CamelCasedPropertiesDeep<Value> = Value extends Function
  ? Value
  : Value extends Array<infer U>
  ? Array<CamelCasedPropertiesDeep<U>>
  : Value extends Set<infer U>
  ? Set<CamelCasedPropertiesDeep<U>>
  : {
      [K in keyof Value as CamelCase<K>]: CamelCasedPropertiesDeep<Value[K]>;
    };
