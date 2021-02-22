export class Tag {
  static fromJson({ id, val, type }) {
    const temporalTag = new Tag(val);

    temporalTag.id = id;
    temporalTag.val = val;
    temporalTag.type = type;

    return temporalTag;
  }

  constructor(val, type) {
    this.val = val;
    this.id = new Date().getTime();
    this.type = type;
  }
}
