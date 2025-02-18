<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <!-- 统计卡片区域 -->
      <el-col :sm="12" :lg="6">
        <el-card class="stat-card">
          <template #header>
            <div class="card-header">
              <span>总申请人数</span>
            </div>
          </template>
          <div class="card-body">
            <div class="stat-number">{{ stats.totalApplications }}</div>
            <div class="stat-trend">
              <span>较上月</span>
              <el-tag
                :type="stats.applicationTrend >= 0 ? 'success' : 'danger'"
                size="small"
              >
                {{ stats.applicationTrend }}%
              </el-tag>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :sm="12" :lg="6">
        <el-card class="stat-card">
          <template #header>
            <div class="card-header">
              <span>通过人数</span>
            </div>
          </template>
          <div class="card-body">
            <div class="stat-number">{{ stats.totalPassed }}</div>
            <div class="stat-trend">
              <span>通过率</span>
              <el-tag type="success" size="small">{{ stats.passRate }}%</el-tag>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :sm="12" :lg="6">
        <el-card class="stat-card">
          <template #header>
            <div class="card-header">
              <span>本月新增申请</span>
            </div>
          </template>
          <div class="card-body">
            <div class="stat-number">{{ stats.monthlyApplications }}</div>
            <div class="stat-trend">
              <span>日均</span>
              <el-tag type="info" size="small">
                {{ stats.dailyAverage }}人
              </el-tag>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :sm="12" :lg="6">
        <el-card class="stat-card">
          <template #header>
            <div class="card-header">
              <span>待审核申请</span>
            </div>
          </template>
          <div class="card-body">
            <div class="stat-number">{{ stats.pendingReview }}</div>
            <div class="stat-trend">
              <el-button type="primary" size="small" @click="handleReview">
                去审核
              </el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 图表区域 -->
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :sm="24" :lg="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>申请趋势</span>
            </div>
          </template>
          <div class="chart-wrapper">
            <div ref="applicationChart" style="height: 300px"></div>
          </div>
        </el-card>
      </el-col>

      <el-col :sm="24" :lg="12">
        <el-card>
          <template #header>
            <div class="card-header">
              <span>通过率分析</span>
            </div>
          </template>
          <div class="chart-wrapper">
            <div ref="passRateChart" style="height: 300px"></div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as echarts from 'echarts'

  export default {
    name: 'Index',
    data() {
      return {
        stats: {
          totalApplications: 1234,
          applicationTrend: 12.5,
          totalPassed: 890,
          passRate: 72.1,
          monthlyApplications: 156,
          dailyAverage: 5,
          pendingReview: 23,
        },
      }
    },
    mounted() {
      this.initApplicationChart()
      this.initPassRateChart()
    },
    methods: {
      handleReview() {
        // 跳转到审核页面
      },
      initApplicationChart() {
        const chart = echarts.init(this.$refs.applicationChart)
        const option = {
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              data: [150, 230, 224, 218, 135, 147],
              type: 'line',
              smooth: true,
            },
          ],
        }
        chart.setOption(option)
      },
      initPassRateChart() {
        const chart = echarts.init(this.$refs.passRateChart)
        const option = {
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [
            {
              type: 'pie',
              radius: '50%',
              data: [
                { value: 735, name: '已通过' },
                { value: 284, name: '未通过' },
                { value: 215, name: '待审核' },
              ],
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        }
        chart.setOption(option)
      },
    },
  }
</script>

<style scoped lang="scss">
  .home {
    .stat-card {
      .card-header {
        font-size: 16px;
        font-weight: 600;
      }

      .card-body {
        text-align: center;
        padding: 20px 0;

        .stat-number {
          font-size: 24px;
          font-weight: bold;
          color: #303133;
          margin-bottom: 10px;
        }

        .stat-trend {
          font-size: 14px;
          color: #909399;

          span {
            margin-right: 8px;
          }
        }
      }
    }

    .chart-wrapper {
      padding: 10px;
    }
  }
</style>
