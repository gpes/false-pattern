metricRelationDatas = read.csv('./results/finalMetricRelations.csv', sep = ',')

#scatter.smooth(x=metricRelationDatas$metricValue, y=metricRelationDatas$NSC)

cor.test(metricRelationDatas$metricValue,metricRelationDatas$SIX)