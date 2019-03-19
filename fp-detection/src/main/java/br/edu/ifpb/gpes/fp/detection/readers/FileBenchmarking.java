package br.edu.ifpb.gpes.fp.detection.readers;

import br.edu.ifpb.gpes.shared.Benchmarking;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author natan
 */
public class FileBenchmarking {

    private File filePath;

    public FileBenchmarking() {
        this(new File("../benchmarking/axion-1.0-M2.json"));
    }

    public FileBenchmarking(File filePath) {
        this.filePath = filePath;
    }

    public Benchmarking readOutput() {
        Benchmarking benchmarking = new Benchmarking();
        String content = "";
        try {
            content = new String(Files.readAllBytes(Paths.get(this.filePath.getPath())));
            
            ObjectMapper objectMapper = new ObjectMapper();
            benchmarking = objectMapper.readValue(content, Benchmarking.class);

        } catch (IOException ex) {
            Logger.getLogger(FileBenchmarking.class.getName()).log(Level.SEVERE, null, ex);
        }
        
        return benchmarking;
    }
}
