<template>
  <div>
    <vab-row class="row_box">
      <vab-col :span="4" class="title_box">通知先</vab-col>
      <vab-col :span="20" class="word_box tzx_box">
        <div class="tzx_box flex_start">
          <div
            v-for="(item, index) in list"
            :key="index"
            class="tzx_item flex_start tzx_css"
          >
            <div class="tzx_left flex_colum">
              <div class="minheight56">
                <div class="title comword ycsl2">
                  {{ item.companyName || item.requestDestName }}
                </div>
                <div class="ke comheight comword">
                  {{ item.deptName || item.orgRoleName }}
                </div>
              </div>
              <!-- <div class="ren comheight comword">{{ item.role }}</div> -->
              <div class="email">
                {{
                  item.requestDestPersonName || item.responsiblePersonName
                }}（{{ item.mailAddress }}）
              </div>
            </div>

            <slot name="del">
              <div
                class="tzx_right flex_center_align flex_center"
                @click="handleDel(item)"
              >
                <div class="del_inner flex_center_align flex_center">
                  <img src="~@/assets/images/close.png" alt="" />
                </div>
              </div>
            </slot>
          </div>
        </div>
        <slot name="btn">
          <div class="flex_start">
            <span
              class="upload_btn_box"
              :class="{ upload_dis_btn: isDisabled }"
              @click="handleCommand('inner')"
            >
              管理部の宛先を追加
            </span>
          </div>
        </slot>
      </vab-col>
    </vab-row>
    <notify-add-company-inner ref="notifyCompanyInner" />
  </div>
</template>

<script>
  export default {
    name: 'VabNotifyrc',
    data() {
      return {
        list: [],
        readOnly: true,
        isDisabled: false,
      }
    },
    methods: {
      setDisabled(val) {
        this.isDisabled = val
      },
      getSubmitList(data) {
        let dataList = []
        data.list.filter((row) => {
          if (
            this.isEqualCodeEnum(
              row.notifyType,
              this.$divisions.notifyTypeEnum.dln
            )
          ) {
            //  社内の宛先を追加
            data = {
              companyName: row.companyName ?? this.$const.companyName,
              deptName: row?.deptName ?? row?.pstsctcdModel?.orgkj,
              responsiblePersonCD: row?.responsiblePersonCD ?? row?.empcd,
              mailAddress: row?.mailadr,
              responsiblePersonName: row?.responsiblePersonName ?? row?.empnmkj,
              notifyType: row?.notifyType,
              isDefault: row?.isDefault,
              temporary: row?.temporary,
            }
          }
          let temp = false
          if (this.list.length > 0) {
            temp = this.list.some((row) => {
              let cd = row?.requestDestPersonCd || row?.responsiblePersonCD
              return (
                row.requestDestCd == data.requestDestCd &&
                (cd == data.responsiblePersonCD ||
                  cd == data.requestDestPersonCd)
              )
            })
          }
          if (!temp) {
            dataList.push(data)
          }
        })
        return dataList
      },
      // 選択データを設定します
      setData(data) {
        if (data?.clear) {
          this.list = []
        }
        if (data?.view) {
          this.view = data?.view
        }
        // 提出に必要な構成を整理する
        let changeList = this.getSubmitList(data)
        this.list = [...this.list, ...changeList]
        this.$emit('getList', this.list)
      },
      handleCommand(command) {
        if (command == 'inner' && !this.isDisabled) {
          this.$refs.notifyCompanyInner.initData({ vm: this })
        }
      },
      handleDel(index) {
        this.$confirm({
          msg: this.$t(`validateMessage.${this.$messageCode.I00000412.name}`),
          yesText: 'ok',
          yes: () => {
            this.msgSuccess(
              this.$t(`validateMessage.${this.$messageCode.I00000414.name}`)
            )
            this.list.splice(index, 1)
          },
        })
      },
      setList(data, status) {
        if (data) {
          this.list = JSON.parse(data)
          this.readOnly = status
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .mode ::v-deep {
    .el-dialog__title {
      color: #003350;
    }
  }
  .mode ::v-deep {
    .el-dialog__body {
      padding: 0;
    }
  }
  .upload_dis_btn {
    color: #848484;
    border-color: #848484;
    cursor: auto !important;

    &:hover {
      color: #a1a1a1;
      border-color: #a1a1a1;
    }
  }
</style>
