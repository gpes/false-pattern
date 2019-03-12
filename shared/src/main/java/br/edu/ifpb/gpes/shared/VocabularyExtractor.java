
package br.edu.ifpb.gpes.shared;

/**
 *
 * @author natan
 * $1.csv
 */
public class VocabularyExtractor {
    
    private String entityName;
    private int LOCCount;
    private int headerCount;
    private int annotationCount;
    private int innerEntitiesLines;
    private int total;
    private String entityType;

    public VocabularyExtractor() {
    
    }
    
    public VocabularyExtractor(String entityName, int LOCCount, int headerCount, int annotationCount, int innerEntitiesLines, int total, String entityType) {
        this.entityName = entityName;
        this.LOCCount = LOCCount;
        this.headerCount = headerCount;
        this.annotationCount = annotationCount;
        this.innerEntitiesLines = innerEntitiesLines;
        this.total = total;
        this.entityType = entityType;
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public int getLOCCount() {
        return LOCCount;
    }

    public void setLOCCount(int LOCCount) {
        this.LOCCount = LOCCount;
    }

    public int getHeaderCount() {
        return headerCount;
    }

    public void setHeaderCount(int headerCount) {
        this.headerCount = headerCount;
    }

    public int getAnnotationCount() {
        return annotationCount;
    }

    public void setAnnotationCount(int annotationCount) {
        this.annotationCount = annotationCount;
    }

    public int getInnerEntitiesLines() {
        return innerEntitiesLines;
    }

    public void setInnerEntitiesLines(int innerEntitiesLines) {
        this.innerEntitiesLines = innerEntitiesLines;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    public String getEntityType() {
        return entityType;
    }

    public void setEntityType(String entityType) {
        this.entityType = entityType;
    }

    @Override
    public String toString() {
        return "VocabularyExtractor{" + "entityName=" + entityName + ", LOCCount=" + LOCCount + ", headerCount=" + headerCount + ", annotationCount=" + annotationCount + ", innerEntitiesLines=" + innerEntitiesLines + ", total=" + total + ", entityType=" + entityType + '}';
    }
    
    
}
