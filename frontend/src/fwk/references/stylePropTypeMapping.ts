export const stylePropTypeMapping = {
  display:
    "block | inline | inline-block | flex | grid | none | contents | table | table-row | table-cell | table-column | table-column-group | table-footer-group | table-header-group | table-row-group | table-caption | list-item | run-in",
  width: "number | string",
  minWidth: "number | string",
  maxWidth: "number | string",
  height: "number | string",
  minHeight: "number | string",
  maxHeight: "number | string",
  padding: "number | string",
  paddingTop: "number | string",
  paddingRight: "number | string",
  paddingBottom: "number | string",
  paddingLeft: "number | string",
  margin: "number | string",
  marginTop: "number | string",
  marginRight: "number | string",
  marginBottom: "number | string",
  marginLeft: "number | string",
  flexDirection: "row | row-reverse | column | column-reverse",
  flexWrap: "nowrap | wrap | wrap-reverse",
  justifyContent:
    "flex-start | flex-end | center | space-between | space-around | space-evenly",
  alignItems: "flex-start | flex-end | center | baseline | stretch",
  alignContent:
    "flex-start | flex-end | center | space-between | space-around | stretch",
  flexBasis: "number | string",
  flexGrow: "number",
  flexShrink: "number",
  flex: "number | string",
  alignSelf: "auto | flex-start | flex-end | center | baseline | stretch",
  position: "static | relative | absolute | fixed | sticky",
  top: "number | string",
  right: "number | string",
  bottom: "number | string",
  left: "number | string",
  zIndex: "number",
  overflow: "visible | hidden | scroll | auto",
  overflowX: "visible | hidden | scroll | auto",
  overflowY: "visible | hidden | scroll | auto",
  visibility: "visible | hidden | collapse",
  backgroundColor: "string",
  color: "string",
  border: "string",
  borderRadius: "number | string",
  boxShadow: "string",
  opacity: "number",
  cursor:
    "auto | default | pointer | wait | text | move | not-allowed | crosshair | progress | alias | cell | copy | grab | grabbing | help | zoom-in | zoom-out",
  transition: "string",
  transform: "string",
  animation: "string",
  fontSize: "number | string",
  fontWeight:
    "normal | bold | bolder | lighter | number | inherit | initial | unset",
  lineHeight: "number | string",
  letterSpacing: "number | string",
  textAlign:
    "left | right | center | justify | start | end | match-parent | justify-all | start | end",
  textDecoration:
    "none | underline | overline | line-through | blink | inherit | initial | unset",
  textTransform:
    "none | capitalize | uppercase | lowercase | full-width | inherit | initial | unset",
  whiteSpace: "normal | nowrap | pre | pre-line | pre-wrap | break-spaces",
  wordBreak: "normal | break-all | keep-all | break-word",
  wordWrap: "normal | break-word | inherit | initial | unset",
  clipPath: "string",
  gap: "string | number",
  background: "string",
  gridTemplateColumns: "string",
  gridTemplateRows: "string",
  gridTemplateAreas: "string",
  gridAutoFlow: "row | column | row-dense | column-dense",
  gridAutoColumns: "string",
  gridAutoRows: "string",
  pointerEvents: "none | auto | all | inherit | initial | unset",
  mask: "string",
  maskImage: "string",
  maskPosition: "string",
  filter: "string",
  aspectRatio: "number | string",
  transformOrigin: "string",
  userSelect: "none | text | all | inherit | initial | unset",
  rowGap: "string | number",
  columnGap: "string | number",
  boxSizing: "content-box | border-box | inherit | initial | unset"
} as const;

export default stylePropTypeMapping;
