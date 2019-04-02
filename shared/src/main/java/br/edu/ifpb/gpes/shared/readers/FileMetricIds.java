/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package br.edu.ifpb.gpes.shared.readers;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

/**
 *
 * @author natan
 */
public class FileMetricIds {
    private File filePath;
    
    public FileMetricIds() {
        this(new File("../selected-qualitas-metrics/metricIds.txt"));
    }
    
    public FileMetricIds(File filePath) {
        this.filePath = filePath;
    }
    
    public List<String> readFile() throws IOException {
        return Files.readAllLines(this.filePath.toPath());
    }
}
