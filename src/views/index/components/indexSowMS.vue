<template>
  <div class="dlIndex">
    <div>Dashboard</div>
  </div>
</template>

<script>
  export default {
    name: 'IndexSowMS',
    activeName: 'タスク一覧',
    data() {
      return {
        activeName: 'タスク一覧',
        dialogVisible: false,
        queryForm: {
          division: null,
        },
        list: [
          {
            name: 'Works SCタスク一覧',
            children: [
              {
                name: '日程調整',
                num: 10,
                children: [
                  {
                    name: '日程調整状況（事前調査）',
                    key: 'investigationAdjScheduleList',
                    emum: 'adjScheduleStatusEnum',
                    children: [
                      {
                        name: '未提出',
                        aniTemp: false,
                        num: 0,
                        status: '01',
                      },
                      {
                        name: '提出済み',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                      {
                        name: '催促中',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                      {
                        name: '差し戻し',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                      {
                        name: '再調整',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                    ],
                  },
                  {
                    name: '日程調整状況（工事）',
                    key: 'constructionAdjScheduleList',
                    emum: 'adjScheduleStatusEnum',
                    children: [
                      {
                        name: '未提出',
                        aniTemp: false,
                        num: 0,
                        status: '01',
                      },
                      {
                        name: '提出済み',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                      {
                        name: '催促中',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                      {
                        name: '差し戻し',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                      {
                        name: '再調整',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                    ],
                  },
                ],
              },
              {
                name: '作業可能日',
                num: 55,
                children: [
                  {
                    name: '回答状況',
                    key: 'requestStatusList',
                    emum: 'requestStatusEnum',
                    children: [
                      {
                        name: '未提出',
                        aniTemp: false,
                        num: 0,
                        status: '01',
                      },
                      {
                        name: '催促中',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                    ],
                  },
                ],
              },
              {
                name: '原価見積書等確認',
                num: 8,
                children: [
                  {
                    name: '書類提出状況',
                    key: 'costEstimateList',
                    emum: 'docSubmitStatusEnum',
                    children: [
                      {
                        name: '未提出',
                        aniTemp: false,
                        num: 0,
                        status: '01',
                      },
                      {
                        name: '提出済み',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                      {
                        name: '催促中',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                      {
                        name: '差し戻し',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                    ],
                  },
                ],
              },
              {
                name: '報告書確認',
                num: 24,
                children: [
                  {
                    name: '報告書提出状況',
                    key: 'docSubmitStatsList',
                    emum: 'docSubmitStatusEnum',
                    children: [
                      {
                        name: '未提出',
                        aniTemp: false,
                        num: 0,
                        status: '01',
                      },
                      {
                        name: '提出済み',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                      {
                        name: '催促中',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                      {
                        name: '差し戻し',
                        aniTemp: false,
                        num: 0,
                        status: '02',
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      }
    },
  }
</script>

<style scoped lang="scss">
  // デフォルトの方向
  .dlIndex ::v-deep .el-collapse-item__arrow {
    transform: rotate(-270deg);
  }
  // クリック後の方向
  .dlIndex ::v-deep .el-collapse-item__arrow.is-active {
    transform: rotate(270deg);
  }

  @mixin animate {
    animation-duration: 0.2s;
    animation-direction: normal;
    animation-timing-function: linear;
    animation-fill-mode: forwards;
  }
  .dlIndex {
    .h_title {
      font-weight: 500;
      font-size: 18px;
      color: #000000;
      height: 40px;
      padding-left: 12px;
      position: relative;
      &::before {
        content: '';
        width: 4px;
        height: 16px;
        background: #003350;
        position: absolute;
        left: 0;
        top: 60%;
        margin-top: -10px;
      }
    }
  }
  .dlIndex ::v-deep {
    .el-collapse-item__header {
      background: none !important;
      border: none !important;
    }
  }

  .dlIndex ::v-deep {
    .el-collapse-item__header .el-collapse-item__arrow {
      font-weight: 300;
      font-size: 15px;
      color: inherit;
    }
  }
  .dlIndex ::v-deep {
    .el-collapse-item__header:first-child {
      border-bottom: 1px solid #d1dae1 !important;
    }
  }
  .dlIndex ::v-deep {
    .el-collapse-item__wrap {
      background: none;
    }
  }
  .dlIndex ::v-deep {
    .el-collapse-item__content {
      line-height: inherit;
    }
  }
  .mark_box {
    height: 24px;
    padding-bottom: 8px;
    color: #003350;
    font-weight: 700;
    font-size: 15px;
    border-bottom: 2px solid #003350;
    margin-bottom: 20px;
  }
  .dlIndex {
    .moude_item {
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.1);
      margin: 0 8px;
      margin-top: 12px;
      overflow: inherit;
      padding: 24px;
    }

    .nums_box {
      .header_box {
        margin-bottom: 8px;
        .title {
          font-weight: 400;
          font-size: 14px;
          color: #848484;
          display: block;
        }
        .link {
          font-weight: 400;
          font-size: 13px;
          text-decoration-line: underline;
          color: #004c82;
          margin-left: 16px;
          cursor: pointer;
        }
      }
      .nums_item-blue {
        background: #ecf5ff;
        .num {
          color: #004c82;
        }
      }
      .nums_item-grey {
        background: #efefef;
        .num {
          color: #bababa;
        }
        &:hover {
          background: #efefef !important;
          .word {
            color: #000000 !important;
          }
          .num {
            color: #bababa !important;
            &::before {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 0px !important;
              content: '';
              background: #fff;
            }
          }
        }
      }

      .nums_item {
        border-radius: 4px;
        width: 170px;
        height: 56px;
        position: relative;
        overflow: hidden;
        padding: 0 16px;
        cursor: pointer;
        margin-right: 8px;
        &:hover {
          background: #71b4ff;
          .word {
            color: #fff;
          }
          .num {
            color: #fff;
            position: relative;
            &::before {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 1px;
              content: '';
              background: #fff;
            }
          }
        }

        .word {
          font-weight: 400;
          font-size: 13px;
          color: #000000;
          display: block;
        }
        .num {
          font-weight: 700;
          font-size: 24px;
          display: block;
          position: relative;
          z-index: 2;
        }
        .round {
          background: #ecf5ff;
          border-radius: 50%;
          width: 130px;
          height: 130px;
          position: absolute;
          right: -130px;
          top: 56px;
          z-index: 1;
        }
      }
    }
  }
  .mr16 {
    margin-bottom: 16px;
  }
</style>
