<template>
  <div>
    <div class="surah-header">
      <div class="surah-header_index font-arabic">
        {{ surahNumber }}
      </div>
      <div class="surah-header_content">
        <div>{{ surahName }}</div>
        <small>({{ surahLatin }} - {{ surahTranslation }})</small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SurahHeader',
  props: {
    surahNumber: {
      type: Number,
      default: 0
    },
    surahName: {
      type: String,
      default: ''
    },
    surahLatin: {
      type: String,
      default: ''
    },
    surahTranslation: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.surah-header {
  width: 90%;
  margin: 1em auto;
  font-size: 2rem;
  display: flex;
  align-content: center;
  align-items: center;

  &_index {
    background-color: #52e0a1;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
    display: flex;
    align-items: center;
    height: 100px;
    padding: .25em .5em;
  }
  &_content {
    background-color: #000;
    color: #52e0a1;
    flex-grow: 1;
    justify-content: space-between;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    text-align: right;
    height: 100px;
    padding: .25em .5em;
    small {
      font-size: 1rem;
    }
  }
}
</style>
