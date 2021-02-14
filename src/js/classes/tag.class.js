export class Tag {
  static fromJson({ id, val }) {
    const temporalTag = new Tag(val);

    temporalTag.id = id;
    temporalTag.val = val;

    return temporalTag;
  }

  constructor(val) {
    this.val = val;
    this.id = new Date().getTime();
  }
}
