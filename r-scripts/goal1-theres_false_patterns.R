library("rjson")
library(gridExtra)

result <- fromJSON(file = "./false-patterns/falsePatterns.json")

projectNames <- character()
entityQuantities <- character()

for(i in 1:length(result$falsePatterns)) {
  projectNames <- c(projectNames, result$falsePatterns[[i]]$projectName)
  entityQuantities <- c(entityQuantities, length(result$falsePatterns[[i]]$metrics))
}

emp.data <- data.frame(
  projectName = projectNames,
  quantity = entityQuantities
)

png(filename = "./r-scripts/goal1.png", width=380,height=400,bg = "white")
grid.table(emp.data)
dev.off()




