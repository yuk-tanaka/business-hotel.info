<template>
  <v-layout
    column>
    <v-flex xs12>
      <section class="page-header mb-4">
        <h1 class="headline">ガイド</h1>
      </section>
    </v-flex>
    <v-flex>
      <section class="body mb-4">
        <h2 class="mb-2">目的</h2>
        <ul class="mb-4">
          <li>楽天トラベルの検索機能が貧弱すぎて辛い</li>
          <li>
            <a
              href="https://www.apahotel.com/"
              target="_blank">アパ直</a>
            が予算オーバーだったときに、いいかんじのビジネスホテルを簡単に探したかった
          </li>
          <li>Nuxt.jsでなにか作ってみたかった</li>
        </ul>
        <h2 class="mb-2">機能</h2>
        <ul class="mb-4">
          <li>エリアに囚われない地点座標からの半径距離で検索</li>
          <li>1泊\1,000～の下限価格設定</li>
          <li>
            検索ノイズの除外
            <ul>
              <li>ゲストハウス、カプセルホテルなどの簡易宿泊所</li>
              <li>リブマックス等によくある
                <a
                  href="https://kawashimablog.com/yufuin/?p=26649"
                  target="_blank">おとり広告</a>
              </li>
              <li>門限のある物件（ドヤ改装系だとよくある、のみにいきたいので辛い）</li>
            </ul>
          </li>
        </ul>
        <h2 class="mb-2">技術</h2>
        <ul class="mb-4">
          <li>
            <a
              href="https://ja.nuxtjs.org/"
              target="_blank">Nuxt.js</a>
          </li>
          <li>
            <a
              href="https://cloud.google.com/maps-platform/?hl=ja"
              target="_blank">Google Maps API</a>
          </li>
          <li>
            <a
              href="https://webservice.rakuten.co.jp/api/vacanthotelsearch/"
              target="_blank">楽天トラベル空室検索API</a>
          </li>
        </ul>
      </section>
    </v-flex>
  </v-layout>
</template>