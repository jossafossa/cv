<script setup>
import data from "@/assets/data.js";
import cardProject from "./components/cardProject.vue";
import BubbleImage from "./components/BubbleImage.vue";
import { getColor } from "@/assets/utils.js";

const random = (arr) =>
  arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

// show hidden if url has ?hidden
const showHidden = () => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.has("extended");
};

/**
 * Gets all the tags from the projects. Sort on the frequency of the tags. Return an array of {tag: string, count: number}
 * @param {Array<{}>} projects
 */
const getFilters = (projects) => {
  projects = projects.filter((project) => !project.hidden || showHidden());

  const tags = projects.flatMap((project) => project.tags);

  let map = new Map();
  tags.forEach((tag) => {
    if (!map.has(tag)) map.set(tag, 0);
    map.set(tag, map.get(tag) + 1);
  });

  let sorted = [...map.entries()].sort((a, b) => b[1] - a[1]);

  return sorted.map(([tag, count]) => ({ tag, count }));
};

const getFilterStyle = (projects) => {
  const tags = getFilters(projects);
  console.log({ tags });
  tags.unshift({ tag: "all" });
  const styles = tags.map((filter) => {
    return `
      .filters:has([data-type*="${filter.tag}"]:checked) [data-type-target*="${filter.tag}"]
    `;
  });
  let selector = styles.join(", ");
  return `
    ${selector} {
      display: block;
    }
  `;
};
</script>

<template>
  <div style="overflow-x: hidden">
    <header class="header">
      <div class="container">
        <div class="row header__inner">
          <div class="col col-12 col-lg-8 header__left">
            <div class="header__photo">
              <bubble-image :sources="data.images"></bubble-image>
            </div>
            <div class="header__content hor-center">
              <h1>{{ data.name }}</h1>
              <div class="key-value">
                <div>{{ data.linksLabel }}</div>

                <a v-for="link in data.links" :href="link.url" class="button">
                  {{ link.label }}
                </a>
              </div>
            </div>
          </div>
          <div class="col col-12 col-lg-4 header__information">
            <table class="fancy condensed">
              <tr v-for="contact in data.contactInfo">
                <td>{{ contact.label }}</td>
                <td>{{ contact.value }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </header>
    <template v-for="section in data.sections">
      <section v-if="section.type === 'content'" class="section" id="about">
        <div class="container small">
          <h1 class="line-left">{{ section.title }}</h1>
          <div class="text-container" v-html="section.content"></div>
        </div>
      </section>

      <section
        v-if="section.type === 'projects'"
        class="section bg-dark filters"
      >
        <div class="container">
          <div class="vstack g-1">
            <h1 class="line-left">{{ section.title }}</h1>

            <component :is="'style'">
              {{ getFilterStyle(section.projects) }}
            </component>

            <div class="hstack f-1">
              <strong>Filter op: </strong>
              <input
                type="radio"
                name="type"
                id="all"
                data-type="all"
                checked
                class="hidden"
              />
              <label for="all" class="tag has-effect">All</label>
              <template v-for="filter in getFilters(section.projects)">
                <input
                  type="radio"
                  name="type"
                  :id="filter.tag"
                  :data-type="filter.tag"
                  class="hidden"
                />
                <label
                  :for="filter.tag"
                  class="tag has-effect"
                  :style="{
                    '--accent': getColor(filter.tag),
                  }"
                  >{{ filter.tag }} ({{ filter.count }})</label
                >
              </template>
            </div>

            <div class="row row-1 row-md-2 row-lg-3 stretch-cards">
              <template v-for="project in random(section.projects)">
                <div
                  class="col"
                  v-if="!project?.hidden || showHidden()"
                  :data-type-target="[...project.tags, 'all'].join(' ')"
                >
                  <card-project :project="project"></card-project>
                </div>
              </template>
            </div>
          </div>
        </div>
      </section>

      <section v-if="section.type === 'educations'" class="section bg-dark">
        <div class="container no-padding">
          <h1 class="section-title has-effect">{{ section.title }}</h1>
          <div class="timeline">
            <div class="timeline__items">
              <div class="timeline__item" v-for="item in section.educations">
                <header class="timeline__item__header">
                  <div class="timeline__item__title">{{ item.title }}</div>
                  <div class="timeline__item__date">{{ item.time }}</div>
                </header>
                <section>
                  <div class="has-effect">
                    <table class="timeline__item__content">
                      <tr v-for="(value, key) in item.attributes">
                        <td>{{ key }}</td>
                        <td>{{ value }}</td>
                      </tr>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section v-if="section.type === 'attributes'" class="section">
        <div class="container">
          <div class="row">
            <div class="col col-12 col-lg-8">
              <div id="skills" class="stretch">
                <h1 class="line-left">{{ section.skills.title }}</h1>
                <div class="skills-container">
                  <div
                    class="skill-table"
                    v-for="skill in section.skills.skills"
                  >
                    <div class="skill-table__title">{{ skill.title }}</div>
                    <div class="skill-table__content">
                      <div class="skill-table__row" v-for="item in skill.items">
                        <div class="">{{ item.label }}</div>
                        <div :value="item.rating" class="rating">
                          <i
                            v-for="index in item.rating"
                            class="fa fa-star"
                          ></i>
                        </div>
                        <div class="suffix">{{ item.suffix }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col col-12 col-lg-4">
              <div class="small">
                <div id="qualities">
                  <h1 class="line-right">{{ section.qualities.title }}</h1>
                  <div class="qualities">
                    <div
                      class="qualities__row"
                      v-for="item in section.qualities.items"
                    >
                      <i :class="['fa', item.icon]"></i>
                      <div class="has-effect">{{ item.label }}</div>
                    </div>
                  </div>
                </div>
                <div id="interests">
                  <h1 class="line-right">{{ section.interests.title }}</h1>
                  <div class="interests-container">
                    <div
                      class="marked has-effect"
                      v-for="item in section.interests.items"
                    >
                      <i v-if="item.icon" :class="['fa', item.icon]"></i>
                      {{ item.label }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </template>
    <footer id="footer" class="bg-dark">
      <div class="container">
        <p>{{ data.footer.label }}</p>
      </div>
    </footer>
  </div>
</template>

<style lang="scss">
[data-type-target] {
  display: none;
}

.hidden {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}
</style>
