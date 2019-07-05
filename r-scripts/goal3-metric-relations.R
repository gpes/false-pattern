metricRelationDatas = read.csv('./results/finalMetricRelations.csv', sep = ',')

scatter.smooth(x=metricRelationDatas$metricValue, y=metricRelationDatas$NOM)

cor.test(metricRelationDatas$metricValue,metricRelationDatas$NOM)