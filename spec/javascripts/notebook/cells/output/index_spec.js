import Vue from 'vue';
import CodeComponent from '~/notebook/cells/output/index.vue';

const Component = Vue.extend(CodeComponent);

describe('Output component', () => {
  let vm;
  let json;

  const createComponent = output => {
    vm = new Component({
      propsData: {
        output,
        count: 1,
      },
    });
    vm.$mount();
  };

  beforeEach(() => {
    json = getJSONFixture('blob/notebook/basic.json');
  });

  describe('text output', () => {
    beforeEach(done => {
      createComponent(json.cells[2].outputs[0]);

      setTimeout(() => {
        done();
      });
    });

    it('renders as plain text', () => {
      expect(vm.$el.querySelector('pre')).not.toBeNull();
    });

    it('renders promot', () => {
      expect(vm.$el.querySelector('.prompt span')).not.toBeNull();
    });
  });

  describe('image output', () => {
    beforeEach(done => {
      createComponent(json.cells[3].outputs[0]);

      setTimeout(() => {
        done();
      });
    });

    it('renders as an image', () => {
      expect(vm.$el.querySelector('img')).not.toBeNull();
    });

    it('does not render the prompt', () => {
      expect(vm.$el.querySelector('.prompt span')).toBeNull();
    });
  });

  describe('html output', () => {
    beforeEach(done => {
      createComponent(json.cells[4].outputs[0]);

      setTimeout(() => {
        done();
      });
    });

    it('renders raw HTML', () => {
      expect(vm.$el.querySelector('p')).not.toBeNull();
      expect(vm.$el.textContent.trim()).toBe('test');
    });

    it('does not render the prompt', () => {
      expect(vm.$el.querySelector('.prompt span')).toBeNull();
    });
  });

  describe('svg output', () => {
    beforeEach(done => {
      createComponent(json.cells[5].outputs[0]);

      setTimeout(() => {
        done();
      });
    });

    it('renders as an svg', () => {
      expect(vm.$el.querySelector('svg')).not.toBeNull();
    });

    it('does not render the prompt', () => {
      expect(vm.$el.querySelector('.prompt span')).toBeNull();
    });
  });

  describe('default to plain text', () => {
    beforeEach(done => {
      createComponent(json.cells[6].outputs[0]);

      setTimeout(() => {
        done();
      });
    });

    it('renders as plain text', () => {
      expect(vm.$el.querySelector('pre')).not.toBeNull();
      expect(vm.$el.textContent.trim()).toContain('testing');
    });

    it('renders promot', () => {
      expect(vm.$el.querySelector('.prompt span')).not.toBeNull();
    });

    it("renders as plain text when doesn't recognise other types", done => {
      createComponent(json.cells[7].outputs[0]);

      setTimeout(() => {
        expect(vm.$el.querySelector('pre')).not.toBeNull();
        expect(vm.$el.textContent.trim()).toContain('testing');

        done();
      });
    });
  });
});
