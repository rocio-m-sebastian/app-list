import { Tag } from './tag.class';

export class TagsList {
  constructor() {
    // this.tags = [];
    this.getSessionStorage();
  }

  addTag(tag) {
    this.tags.push(tag);
    this.saveSessionStorage();
  }

  deleteTag(id) {
    this.tags = this.tags.filter((tag) => tag.id !== id);
    this.saveSessionStorage();
  }

  deleteAllTags() {
    this.tags = [];
    this.saveSessionStorage();
  }

  saveSessionStorage() {
    sessionStorage.setItem('tags', JSON.stringify(this.tags));
  }

  getSessionStorage() {
    this.tags = (sessionStorage.getItem('tags'))
      ? JSON.parse(sessionStorage.getItem('tags'))
      : [];

    this.tags = this.tags.map(Tag.fromJson);
  }
}
