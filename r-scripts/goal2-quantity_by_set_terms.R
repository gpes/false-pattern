library("rjson")
library(gridExtra)

result <- fromJSON(file = "./false-patterns/falsePatternsUnionTerms.json")

projectNames <- c()
entityQuantities <- c()

for(i in 1:length(result$falsePatterns)) {
  projectNames <- c(projectNames, result$falsePatterns[[i]]$projectName)
  entityQuantities <- c(entityQuantities, length(result$falsePatterns[[i]]$metrics))
}

# Adicionando total de indicios
projectNames <- c(projectNames, "Total")
entityQuantities <- c(entityQuantities, sum(entityQuantities))

emp.data <- data.frame(
  projectName = projectNames,
  quantity = entityQuantities
)

print(entityQuantities)

png(filename = "./results/goal2-h3.png", width=380,height=415,bg = "white")
grid.table(emp.data)
dev.off()




