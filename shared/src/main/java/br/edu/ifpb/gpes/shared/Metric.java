/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.shared;

/**
 *
 * @author natan
 */
public class Metric {
    private String entityName;
    private int metricValue;

    public Metric(String entityName, int metricValue) {
        this.entityName = entityName;
        this.metricValue = metricValue;
    }

    public Metric() {
    }

    public String getEntityName() {
        return entityName;
    }

    public void setEntityName(String entityName) {
        this.entityName = entityName;
    }

    public int getMetricValue() {
        return metricValue;
    }

    public void setMetricValue(int metricValue) {
        this.metricValue = metricValue;
    }

    @Override
    public String toString() {
        return "Metric{" + "entityName=" + entityName + ", metricValue=" + metricValue + '}';
    }
}
