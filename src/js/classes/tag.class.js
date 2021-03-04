import { v4 as uuidv4 } from 'uuid';

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
    this.id = uuidv4();
    this.type = type;
  }
}
